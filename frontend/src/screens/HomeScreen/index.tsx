import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { IUser, IUserData } from "../../types/userDiary";
import { BACKEND_API_URL } from "@env";
import {
  FlatList,
  SafeAreaView,
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
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'; // Importação da navegação
import { Alert } from 'react-native';
import { UserContext } from "../../context/userContext";
import { styles } from "./styles";
import MetricasConsumo from "../../components/MetricasConsumo";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, setNewDate } from "../../dateSlice";
type MainNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

type ItemData = {
  id: number;
  title: string;
  date: string;
};

type Props = {
  navigation: MainNavigationProp;
};
const Main = ({ navigation }: Props) => {
  const navigationMetrica = useNavigation<MetricasComponentNavigationProp>();
  const [selectedId, setSelectedId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);
  const [dataList, setDataList] = useState<ItemData[]>([]);
  const [userMG, setUserMG] = useState<IUser>() || null;
  const [userPG, setUserPG] = useState<IUserData>();
  const userContexto = useContext(UserContext);
  const user = userContexto?.user
  const setUser = userContexto?.setUser;

  // REDUX LOGIC
  const dataSelecionada = useSelector(selectDate);
  const dispatch = useDispatch();

  type AguaComponentNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AguaComponent"
  >;
  const navigationAgua = useNavigation<AguaComponentNavigationProp>();

  type MetricasComponentNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AlimentacaoComponent"
  >;


  const formatDateTitle = (date: moment.Moment): string => {
    return `${date.format("ddd")}\n${date.format("DD/MM")}`;
  };


  useEffect(() => {
    if (!userContexto) return;
    const isProfileIncomplete =
      !user?.nomeUsuario || !user.altura || !user.peso || !user.genero;

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
    // Executa a verificação após 2 segundos

  }, [userPG, navigation]);



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


  useFocusEffect(
    useCallback(() => {
      const initialData: ItemData[] = [];
      for (let i = -2; i <= 1; i++) {
        const date = moment().add(i, "days");
        let id = Math.random();
        initialData.push({
          id,
          title: formatDateTitle(date),
          date: date.format("YYYY-MM-DD"),
        });
        if (moment(date).format("YYYY-MM-DD") === dataSelecionada) {
          setSelectedId(id);
        }
      }
      setDataList(initialData);
      if (selectedId === null) setSelectedId(initialData[2].id);

      loadDashboard(user?.id, dataSelecionada);
    }, [dataSelecionada])
  );




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

      setUserMG(response.data.user);
      setLoading(false);

    } catch (error: any) {
      console.log("ERROR:", error.message);
    }
  };


  const loadDashboard = async (myUser: any, date: string) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/dashboard/${myUser}`, {
        data: date,
      });
      setUserMG(response.data.userMG);
      setUserPG(response.data.userPG);

    } catch (error) {
      console.log("ERRO ao buscar dados dashboard, criando nova data...");
      if (user) {
        createDate(date, parseInt(user.id));
        setLoading(false);
      }
    }
  };


  const handleDatePress = async (item: ItemData) => {
    setLoading(true);
    setSelectedId(item.id);
    dispatch(setNewDate(item.date))

    if (user) {
      try {
        const response = await axios.post(
          `${BACKEND_API_URL}/dashboard/${user?.id}`,
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
          createDate(item.date, parseInt(user?.id));
        }
      }
    }
  };

  const renderFooter = () => (loading ? <ActivityIndicator /> : null);
  const renderHeader = () => (loadingPast ? <ActivityIndicator /> : null);

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.date === dataSelecionada ? "#91C788" : "#FF9385";
    const color = item.date === dataSelecionada ? "#fff" : "#ffffff9e";



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
          <ActivityIndicator size={"large"} color={"#97cc74"} />
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
                  if (nativeEvent.contentOffset.x <= 0.1) {
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
          <MetricasConsumo userMG={userMG} navigation={navigationMetrica as MetricasComponentNavigationProp} />
        </ScrollView>
      }
    </SafeAreaView>
  );
};

export default Main;
