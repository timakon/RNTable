import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import {data} from './data'

export default function App() {
  const [search, setSearch] = useState('')
  const service = data;

  const [filterData, setFilterData] = useState(service)

  const tableHeader = () => (
      <View style={styles.tableHeader}>
          <Text style={{...styles.columnIDHeader, fontWeight:"bold", color: "white"}}>Номер</Text>
          <Text style={{...styles.columnNAMEHeader, fontWeight:"bold", color: "white"}}>Название</Text>
          <Text style={{...styles.columnPRICEHeader, fontWeight:"bold", color: "white"}}>Цена</Text>
      </View>
  )

  const searchFilter = (text) => {
    if(text) {
      const newData = service.filter((item) => {
        const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilterData(newData)
      setSearch(text)
    } else {
      setFilterData(service)
      setSearch(text)
    }
  }

  return (
        <View style={styles.container}>
          <TextInput
              style = {styles.textInputStyle}
              value={search}
              placeholder="Поиск"
              underlineColorAndroid="transparent"
              onChangeText={(text) => searchFilter(text)}
          />
          <FlatList
              data={filterData}
              style={{width:"95%"}}
              keyExtractor={(item, index) => index+""}
              renderItem={({item, index})=> {
                return (
                    <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                      <Text style={{...styles.columnIDRowTxt, fontWeight:"bold"}}>{item.id}</Text>
                      <Text style={styles.columnNAMERowTxt}>{item.Name}</Text>
                      <Text style={styles.columnPRICERowTxt}>{item.cost}</Text>
                    </View>
                )
              }}
          />
          <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnIDRowTxt: {
    width:"10%",
    textAlign:"center",
  },
  columnNAMERowTxt: {
    width:"75%",
    textAlign:"center",
  },
  columnPRICERowTxt: {
    width:"15%",
    textAlign:"center",
  },
  textInputStyle: {
    height:40,
    borderWidth: 1,
    borderRadius: 11,
    paddingLeft:20,
    marginBottom:15,
    width:"95%"
  }
});
