import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';

type ItemData = {
  id: number;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 0,
    title: 'Qua\n18/09',
  },
  {
    id: 1,
    title: 'Qui\n19/09',
  },
  {
    id: 2,
    title: 'Sex\n20/09',
  },
  {
    id: 3,
    title: 'Sab\n21/09',
  },
  {
    id: 4,
    title: 'Dom\n22/09',
  },

];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState<number | string>(2);
  const [loading, setLoading] = useState(false);

  function renderFooter() {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );

  };

  function loadDatas() {
    setLoading(true);
    DATA.push({ id: Math.random(), title: 'Seg\n23/09' })
    DATA.push({ id: Math.random(), title: 'Ter\n24/09' })
    DATA.push({ id: Math.random(), title: 'Qua\n25/09' })
    DATA.push({ id: Math.random(), title: 'Qui\n26/09' })
    console.log("LOAD DATA")
  }

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#4f993f' : '#94df83';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={"white"}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedId}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => loadDatas()}
        onEndReachedThreshold={0.01}
        ListFooterComponent={() => renderFooter()}

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
    elevation: 6
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: "auto"
  },
  loading: {
    alignSelf: 'center',
    marginTop: 35
  },
});

export default Dashboard;