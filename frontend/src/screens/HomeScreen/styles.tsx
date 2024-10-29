import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
