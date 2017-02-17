import $ from 'jquery';
import Backbone from 'backbone';

import {PlaylistCollection, PlaylistModel} from '../models/model-playlist.js'


var currDate = new Date;
var first = currDate.getDate() - currDate.getDay()
var firstday = new Date(currDate.setDate(first)).toUTCString()
var firstdayShort = firstday.slice(0,16)

// console.log(PlaylistCollection)
const AppRouter = Backbone.Router.extend({
  initialize: function(){

    Backbone.history.start()
  },

  routes: {
    "":'showHomePage',
    'radio/1' : 'showRadio1Page',
    'radio/2' : 'showRadio2Page',
    'featured-content/' : 'contentTitle'
  },

  showHomePage: function(){
    let playlistCollInstance = new PlaylistCollection(1)
    playlistCollInstance.fetch().then( function(serverRes){
      let homeArray = serverRes.playlist.introducing
      console.log(homeArray)
      let homeHtml = homeArray.map( function(introObj){
        return `
           <div class="introducing">
             <p>Introducing</p>
             <img src="${introObj.image}">
             <h3><strong>${introObj.title}</strong></h3>
             <h3>${introObj.artist}</h3>
           </div>
           `
      }).join('')
      document.querySelector('.empty-page').innerHTML = homeHtml
    })

  },

  showRadio1Page: function(){
    let playlistCollInstance = new PlaylistCollection(1)
    playlistCollInstance.fetch().then( function(serverRes){
      let playlistOneArray = serverRes.playlist.a
      // console.log(playlistOneArray)
      let playlistOneHtml = playlistOneArray.map( function(introObj){
        return `
        <div class="playlist-container">
          <div class="playlist-thumb">
            <img src="${introObj.image}">
            <h4><strong>${introObj.title}</strong><h4>
            <h4>${introObj.artist}</h4>
            <p>Add <strong>+</strong></p>
          </div>
        </div>
        `
      }).join('')
      document.querySelector('.empty-page').innerHTML = `<h1>BBC Radio1 Playlist: Week Of ${firstdayShort}</h1>` + playlistOneHtml
    })
  },

  showRadio2Page: function(){
    let playlistCollInstance = new PlaylistCollection(2)
    playlistCollInstance.fetch().then( function(serverRes){
      let playlistTwoArray = serverRes.playlist.a
      console.log(serverRes)


      let playlistTwoHtml = playlistTwoArray.map( function(introObj){
        return `
        <div class="playlist-container">
          <div class="playlist-thumb">
            <img src="${introObj.image}">
            <h4><strong>${introObj.title}</strong><h4>
            <h4>${introObj.artist}</h4>
            <p>Add<strong>+</strong></p>
          </div>
        </div>
        `
      }).join('')
      document.querySelector('.empty-page').innerHTML = `<h1>BBC Radio2 Playlist: Week Of ${firstdayShort}</h1>` + playlistTwoHtml
    })
  },

  contentTitle: function(){
    let playlistCollInstance = new PlaylistCollection(2)
    playlistCollInstance.fetch().then( function(serverRes){
      let greatestriffsArray = serverRes.playlist.greatestriffs
      console.log(greatestriffsArray)
      let greatestriffsHtml = greatestriffsArray.map( function(riffObj){
        return`
        <div class="playlist-container">
          <div class="playlist-thumb">
            <img src="${riffObj.image}">
            <h4><strong>${riffObj.title}</strong><h4>
            <h4>${riffObj.artist}</h4>
            <p>Add<strong>+</strong></p>
          </div>
        </div>
        `
      }).join('')
      let weeklyArtistArray = serverRes.playlist.aotw
      let weeklyArtistHtml = weeklyArtistArray.map( function(artistObj){
        return`
        <div class="otw-container">
          <div class="otw-thumb">
            <h3>Artist of the Week</h3>
            <img src="${artistObj.image}">
            <h4><strong>${artistObj.title}</strong><h4>
            <h4>${artistObj.artist}</h4>
            <p>Add<strong>+</strong></p>
          </div>
        </div>
        `
      }).join('')
      let weeklyRecordArray = serverRes.playlist.rotw
      let weeklyRecordHtml = weeklyRecordArray.map( function(recordObj){
        return`
        <div class="otw-container">
          <div class="otw-thumb">
            <h3>Record of the Week</h3>
            <img src="${recordObj.image}">
            <h4><strong>${recordObj.title}</strong><h4>
            <h4>${recordObj.artist}</h4>
            <p>Add<strong>+</strong></p>
          </div>
        </div>
        `
      })
      document.querySelector('.empty-page').innerHTML = `<h1>BBC Featured Content: Week Of ${firstdayShort}</h1>` + weeklyArtistHtml + weeklyRecordHtml + '<h2>Greatest Guitar Riffs</h2>' + greatestriffsHtml
    })
  }

})

let myNewApp = new AppRouter()
