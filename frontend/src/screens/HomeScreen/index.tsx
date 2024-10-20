import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { IUser, IUserData } from "../../types/userDiary";
import { BACKEND_API_URL } from "@env";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import PieChartCalorias from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import AguaConsumo from "../../components/AguaConsumo";
import AlimentacaoConsumo from "../../components/AlimentacaoConsumo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IuserLogin } from "../../types/user";
import { useNavigation } from '@react-navigation/native'; // Importação da navegação
import { Alert } from 'react-native';
type MainNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
type ItemData = {
  id: number;
  title: string;
  date: string;
};
type Props = {
  navigation: MainNavigationProp;
};
const HomeScreen = ({ navigation }: Props) => {
  const navigationMetrica = useNavigation<MetricasComponentNavigationProp>();
  const [selectedId, setSelectedId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);
  const [dataList, setDataList] = useState<ItemData[]>([]);
  const [userMG, setUserMG] = useState<IUser>();
  const [user, setUser] = useState<IuserLogin>();
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userMG || !userPG) return;
  
      const isProfileIncomplete =
        !userPG.nomeUsuario || !userPG.altura || !userPG.peso || !userPG.genero || !userPG.meta;
  
      if (isProfileIncomplete) {
        Alert.alert(
          "Cadastro Incompleto",
          "Seu cadastro está incompleto. Você será redirecionado para completar o perfil.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("EditProfile"), // Redireciona para a tela de edição de perfil
            },
          ]
        );
      }
    }, 10000); // Executa a verificação após 10 segundos
  
    return () => clearTimeout(timer);
  }, [userPG, navigation]);


  const formatDateTitle = (date: moment.Moment): string => {
    return `${date.format("ddd")}\n${date.format("DD/MM")}`;
  };

  const loadPastDates = async () => {
    if (loadingPast || dataList.length === 0) return;
    setLoadingPast(true);

    setTimeout(() => {
      const newDates: ItemData[] = [];
      const firstDate = moment(dataList[0].date).clone();
      for (let i = -1; i >= -2; i--) {
        const pastDate = firstDate.clone().add(i, "days");
        newDates.push({
          id: Math.random(),
          title: formatDateTitle(pastDate),
          date: pastDate.format("YYYY-MM-DD"),
        });
      }

      setDataList((prevList) => [...newDates, ...prevList]);
      setLoadingPast(false);
    }, 1000);
  };


  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        await loadDashboard(JSON.parse(storedUser), moment().utc().format("YYYY-MM-DD")).then((response: any) => {
          setUserMG(response.userMG);
          setUserPG(response.userPG);
        })
      }
    } catch (error) {
      console.log("Erro ao obter dados do AsyncStorage:", error);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', async () => {
      const initialData: ItemData[] = [];
      for (let i = -2; i <= 1; i++) {
        const date = moment().add(i, "days");
        initialData.push({
          id: Math.random(),
          title: formatDateTitle(date),
          date: date.format("YYYY-MM-DD"),
        });
      }
      setDataList(initialData);
      setSelectedId(initialData[2].id);
      await loadUserFromStorage() // Load user from AsyncStorage
    })
  }, [navigation])



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
      const response = await axios.post(`${BACKEND_API_URL}/data/${idUser}`, {
        data: date,
      });
      const newItem: ItemData = {
        date: date,
        id: Math.random(),
        title: response.data.data,
      };

      setUserMG(response.data.user);

    } catch (error: any) {
      console.error("ERROR:", error.message);
    }
  };

  const loadDashboard = async (myUser: any, date: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/dashboard/${myUser.id}`,
        {
          data: date,
        }
      )
      await setDataStorage(date);
      return response.data

    } catch (error: any) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      if (user) {
        createDate(date, parseInt(user.id));
      }
      setLoading(false);
    }
  };

  const setDataStorage = async (date: string) => {
    await AsyncStorage.setItem("date", JSON.stringify(date));
  }

  const handleDatePress = async (item: ItemData) => {
    setSelectedId(item.id);
    await setDataStorage(item.date);
    setLoading(true);
    if (user) {
      try {
        const response = await axios.post(
          `${BACKEND_API_URL}/dashboard/${user.id}`,
          {
            data: item.date,
          }
        );
        if (response.status == 201) {
          setUserMG(response.data.userMG);
          setUserPG(response.data.userPG);
        }

      } catch (error: any) {
        console.log("ERRO ao buscar dados dashboard, criando nova data...");
        if (user) {
          createDate(item.date, parseInt(user.id));
        }
      }
    }
  };

  const renderFooter = () => (loading ? <ActivityIndicator /> : null);
  const renderHeader = () => (loadingPast ? <ActivityIndicator /> : null);

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
      {!userMG ?
        <View style={[styles.loadingWait, styles.loadingHorizontal]}>
          <ActivityIndicator size={"large"} color={"#97cc74"}/>
        </View>
        :
        <ScrollView>


          <View style={styles.metricas}>
            <View>
              <FlatList
                horizontal
                data={dataList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectedId}
                showsHorizontalScrollIndicator={false}
                onEndReached={loadDatas}
                onEndReachedThreshold={0.01}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                onScroll={({ nativeEvent }) => {
                  if (nativeEvent.contentOffset.x <= 10) {
                    loadPastDates();
                  }
                }}
              />
            </View>

            <Text style={styles.userTitle}>
              Bem vindo(a), {user?.nomeUsuario || "usuario"}
            </Text>
            <Text style={styles.userSubTitle}>
              Acompanhe seu relatório nutricional diário:
            </Text>
            <PieChartCalorias userMG={userMG} />
            <BarChart userMG={userMG} />
          </View>

          <AguaConsumo userMG={userMG} navigation={navigationAgua} />
          <AlimentacaoConsumo userMG={userMG} navigation={navigationMetrica} />
        </ScrollView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    gap: 20,
    marginBottom: 12
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
    fontSize: 15,
    textAlign: "center",
    margin: "auto",
  },
  loading: {
    alignSelf: "center",
    marginTop: 35,
  },
  userTitle: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  userSubTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 5,
  },
  loadingWait: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default HomeScreen;