import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { IUser, IUserData } from '../../types/userDiary';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import PieChartCalorias from '../../components/PieChart';
import BarChart from '../../components/BarChart';

type ItemData = {
  id: number;
  title: string;
  date: string;
};

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState<number | string>();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<ItemData[]>([]);
  const [userMG, setUserMG] = useState<IUser>();
  const [userPG, setUserPG] = useState<IUserData>();

  // Helper function to format the date title
  const formatDateTitle = (date: moment.Moment): string => {
    return `${date.format('ddd')}\n${date.format('DD/MM')}`;
  };

  // Load the initial set of dates: 2 before, today, and 1 day ahead
  useEffect(() => {
    const initialData: ItemData[] = [];
    for (let i = -2; i <= 1; i++) {
      const date = moment().add(i, 'days');
      initialData.push({
        id: Math.random(),
        title: formatDateTitle(date),
        date: date.format('YYYY-MM-DD'),
      });
    }
    setSelectedId(initialData[2].id);
    setDataList(initialData);
    loadDashboard(1, initialData[2].date);
  }, []);

  // Gera mais 2 datas
  const loadDatas = () => {
    setLoading(true);
    const newDates: ItemData[] = [];
    const lastDate = moment(dataList[dataList.length - 1].date); // Busca a ultima data


    for (let i = 1; i <= 2; i++) {
      const nextDate = lastDate.add(1, 'days').clone();
      newDates.push({
        id: Math.random(),
        title: formatDateTitle(nextDate),
        date: nextDate.format('YYYY-MM-DD'),
      });
    }

    setDataList((prevList) => [...prevList, ...newDates]);
    setLoading(false);
  };

  const createDate = async (date: string, idUser: number) => {
    try {
      const response = await axios.post(`http://93.127.211.47:3010/data/1`, {
        data: date,
      });
      const newItem: ItemData = { date: date, id: idUser, title: response.data.data };
      handleDatePress(newItem);
    } catch (error: any) {
      console.error("ERROR:", error.message);
    }
  };

  const loadPieChart = async (data: IUser) => {
    let dados = [1000, 1000]

    if (data.macroIdeal?.Caloria > 0 && data.macroReal?.Caloria > 0) {
      dados = [data.macroIdeal?.Caloria, data.macroReal?.Caloria]
    }
  }

  const loadDashboard = async (id: number, date: string) => {
    try {
      const response = await axios.post(`http://93.127.211.47:3010/dashboard/1`, {
        data: date,
      });
      setUserMG(response.data.userMG);
      setUserPG(response.data.userPG);
      loadPieChart(response.data.userMG)

    } catch (error: any) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      createDate(date, 1);
      setLoading(false);
    }
  }

  const handleDatePress = async (item: ItemData) => {
    setSelectedId(item.id);
    setLoading(true);
    try {
      const response = await axios.post(`http://93.127.211.47:3010/dashboard/1`, {
        data: item.date,
      });
      if (response.status == 201) {
        setUserMG(response.data.userMG);
        setUserPG(response.data.userPG);
        loadPieChart(response.data.userMG)

      }
    } catch (error: any) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      createDate(item.date, 1);
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#FF9385' : '#94df83';
    return (
      <TouchableOpacity
        onPress={() => handleDatePress(item)}
        style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: 'white' }]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadDatas} // Trigger loadDatas on end reach
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooter}
      />
      <PieChartCalorias userMG={userMG}/>
      <BarChart userMG={userMG}/>
      <Text>DADOS DO USUÁRIO - BANCO DE DADOS</Text>

      {userPG &&
        <View>
          <Text>Nome do usuário:{userPG?.nomeUsuario || ""}</Text>
          <Text>Altura do usuário:{userPG?.altura || ""}</Text>
          <Text>Peso do usuário:{userPG?.peso || ""}</Text>
          <Text>Genero do usuário:{userPG?.genero || ""}</Text>
          <Text>Meta do usuário:{userPG?.meta || ""}</Text>
          <Text>Taxa metabolica basal:{userPG?.TMB || ""}</Text>
        </View>}



      <Text style={{ fontSize: 21 }}>DADOS DO USUÁRIO MONGODB</Text>
      {userMG &&
        <View>
          <Text>INGESTÃO DE AGUA ATUAL:{userMG?.ingestaoAgua?.ingestaoAtual || "0"}</Text>
          <Text>INGESTÃO DE AGUA IDEAL:{userMG?.ingestaoAgua?.ingestaoIdeal || "0"}</Text>
          <Text>IMC ATUAL:{userMG?.metrica?.ImcAtual || "0"}</Text>
          <Text>IMC REAL:{userMG?.metrica?.ImcIdeal || "0"}</Text>
        </View>
      }








    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    margin: 10,
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(38, 87, 215, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 'auto',
  },
  loading: {
    alignSelf: 'center',
    marginTop: 35,
  },
});

export default Dashboard;
