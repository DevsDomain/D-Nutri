import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { IUser, IUserData } from "../../types/userDiary";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Dimensions,
} from "react-native";
import PieChartCalorias from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import AguaConsumo from "../../components/AguaConsumo";
import AlimentacaoConsumo from "../../components/AlimentacaoConsumo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import { useNavigation } from "@react-navigation/native"; // Importação da navegação

const screenWidth = Dimensions.get("window").width;

type ItemData = {
  id: number;
  title: string;
  date: string;
};

const HomeScreen = () => {
  const [selectedId, setSelectedId] = useState<number | string>();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<ItemData[]>([]);
  const [userMG, setUserMG] = useState<IUser>();
  const [userPG, setUserPG] = useState<IUserData>();

  type AguaComponentNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AguaComponent"
  >;
  const navigationAgua = useNavigation<AguaComponentNavigationProp>();

  type MetricasComponentNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AlimentacaoComponent"
  >;
  const navigationMetrica = useNavigation<MetricasComponentNavigationProp>();

  // Helper function to format the date title
  const formatDateTitle = (date: moment.Moment): string => {
    return `${date.format("ddd")}\n${date.format("DD/MM")}`;
  };

  // Load the initial set of dates: 2 before, today, and 1 day ahead
  useEffect(() => {
    const initialData: ItemData[] = [];
    for (let i = -2; i <= 1; i++) {
      const date = moment().add(i, "days");
      initialData.push({
        id: Math.random(),
        title: formatDateTitle(date),
        date: date.format("YYYY-MM-DD"),
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
      const nextDate = lastDate.add(1, "days").clone();
      newDates.push({
        id: Math.random(),
        title: formatDateTitle(nextDate),
        date: nextDate.format("YYYY-MM-DD"),
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
      const newItem: ItemData = {
        date: date,
        id: idUser,
        title: response.data.data,
      };
      handleDatePress(newItem);
    } catch (error: any) {
      console.error("ERROR:", error.message);
    }
  };

  const loadPieChart = async (data: IUser) => {
    let dados = [1000, 1000];

    if (data.macroIdeal?.Caloria > 0 && data.macroReal?.Caloria > 0) {
      dados = [data.macroIdeal?.Caloria, data.macroReal?.Caloria];
    }
  };

  const loadDashboard = async (id: number, date: string) => {
    try {
      const response = await axios.post(
        `http://93.127.211.47:3010/dashboard/1`,
        {
          data: date,
        }
      );
      setUserMG(response.data.userMG);
      setUserPG(response.data.userPG);
      loadPieChart(response.data.userMG);
    } catch (error: any) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      createDate(date, 1);
      setLoading(false);
    }
  };

  const handleDatePress = async (item: ItemData) => {
    setSelectedId(item.id);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://93.127.211.47:3010/dashboard/1`,
        {
          data: item.date,
        }
      );
      if (response.status == 201) {
        setUserMG(response.data.userMG);
        setUserPG(response.data.userPG);
        loadPieChart(response.data.userMG);
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
    const backgroundColor = item.id === selectedId ? "#91C788" : "#FF9385";
    const color = item.id === selectedId ? "#fff" : "#ffffff9e";

    return (
      <TouchableOpacity
        onPress={() => handleDatePress(item)}
        style={[styles.item, { backgroundColor }]}
      >
        <Text style={[styles.title, { color: color }]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.metricas}>
        <View>
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
        </View>

        <Text style={styles.userTitle}>
          {" "}
          Bem vindo(a), {userPG?.nomeUsuario || "usuario"}
        </Text>
        <Text style={styles.userSubTitle}>
          Acompanhe seu relatório nutricional diário:
        </Text>

        <PieChartCalorias userMG={userMG} />
        <BarChart userMG={userMG} />
      </View>

      <AguaConsumo userMG={userMG} navigation={navigationAgua} />
      <AlimentacaoConsumo userMG={userMG} navigation={navigationMetrica} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    gap: 20,
  },
  metricas: {
    borderRadius: 30,
    paddingBottom: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 0 },
  },
  item: {
    padding: 5,
    margin: 10,
    width: 80,
    maxHeight: 60,
    borderRadius: 10,
    backgroundColor: "rgba(38, 87, 215, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: "auto",
  },
  loading: {
    alignSelf: "center",
    marginTop: 35,
  },
  userTitle: {
    fontSize: 21,
    fontWeight: 700,
    textAlign: "center",
    marginVertical: 10,
  },
  userSubTitle: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 5,
  },
});

export default HomeScreen;
