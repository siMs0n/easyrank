# Easy Rank
Easy Rank is an app where you get ranked between your friends in your game of choice depending on the outcome of matches you play with them. It's based on the Elo Rating System.

### Prerequisites to run
- Node
- MongoDB
- react-native-cli
- Android SDK

### Installation

Web server:
```sh
$ cd web-server
$ npm install
$ node app.js
```

React native app:
```sh
$ cd mobile-app/EasyRank
$ npm install
$ react-native run-android
```

### Build the release variant of app with bundled js
Insert signing credentials in signingConfigs in `easyrank/mobile-app/EasyRank/android/app/build.gradle`.

Run the following in `easyrank/mobile-app/EasyRank/android`:

```sh
$ ./gradlew assembleRelease
```

Then you can find the APK in ` easyrank/mobile-app/EasyRank/android/app/build/outputs/apk`