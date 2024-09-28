import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
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

type ItemData = {
  id: number;
  title: string;
  date: string;
};

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState<number | string>(2);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<ItemData[]>([]);

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
    setDataList(initialData);
  }, []);

  // Function to load 2 more dates ahead
  const loadDatas = () => {
    setLoading(true);
    const newDates: ItemData[] = [];
    const lastDate = moment(dataList[dataList.length - 1].date); // Get the last date

    // Generate two more days ahead
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
      const response = await axios.post(`http://93.127.211.47:3010/data/5`, {
        data: date,
      });
      const newItem: ItemData = { date: date, id: idUser, title: response.data.data };
      handleDatePress(newItem);
    } catch (error: any) {
      console.error("ERROR:", error.message);
    }
  };

  const handleDatePress = async (item: ItemData) => {
    setSelectedId(item.id);
    setLoading(true);
    try {
      const response = await axios.post(`http://93.127.211.47:3010/dashboard/5`, {
        data: item.date,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      createDate(item.date, item.id);
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
    const backgroundColor = item.id === selectedId ? '#4f993f' : '#94df83';
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
