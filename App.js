import React from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView, Image} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount () {
    return fetch('https://jsonplaceholder.typicode.com/photos')
    .then ((response) => response.json())
    .then ((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      })
    })

    .catch((error) => {
      console.log(error)
    });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let photos = this.state.dataSource.map((val, key) => {
        if (val.id>6) {
          return  <View key={key} style={styles.item}>
                    <Image
                    style={{width: 50, height: 50}}
                    source={{uri: val.thumbnailUrl}}
                    ></Image>
                    <Text>
                    {val.title}
                    </Text>
                  </View>
        }
      });
      return (
        <View style={styles.container}>
          <View>
            <Text style={{fontWeight:'bold', fontSize:30}}>&nbsp;Photo List :</Text>
          </View>
          <ScrollView>
            {photos}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
