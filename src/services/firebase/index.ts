import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import COLLECTIONS from './collections';
import moment from 'moment';

export default class FirebaseService {
  auth = auth();

  firestore = firestore();

  messageRef = (collection: string) => this.firestore.collection(collection);

  async signIn() {}

  async fetchMessages(collection: string, observer: any) {
    return this.messageRef(collection)
      .orderBy('date', 'asc')
      .onSnapshot(observer);
  }

  async createMessage({message, collection}: any) {
    this.firestore.settings({ignoreUndefinedProperties: true});

    await this.firestore.collection(collection).add(message);
  }
  async createCollection({uid, receiverid, collection}: any) {
    const res = await this.firestore.collection(collection).limit(1).get();
    if (res.empty) {
      await this.messageRef(collection).add({
        user1: uid,
        user2: receiverid,
        created_at: new Date(),
      });
    }
  }
  async getCollectionName({uid, receiverid}: any) {
    var collec = `Chat-${receiverid}-${uid}`;

    const res = await this.firestore.collection(collec).limit(1).get();
    if (!res.empty) {
      return collec;
    } else {
      collec = `Chat-${uid}-${receiverid}`;
      const res2 = await this.firestore.collection(collec).limit(1).get();
      if (!res2.empty) {
        return collec;
      }
    }
    return collec;
  }
  async isCollectionExists(collec: any) {
    const res = await this.firestore.collection(collec).limit(1).get();
    if (res.empty) {
      return false;
    } else {
      return true;
    }
  }
  async getLastDoc(collec: any) {
    const res = await (
      await this.firestore.collection(collec).orderBy('date').get()
    ).docs.reverse()[0];
    return res;
  }
  async deleteFirebaseChat(collec) {
    const res = await this.firestore
      .collection(collec)
      .get()
      .then(querySnapshot => {
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
      });

    if (res == undefined) {
      return true;
    }
  }

  chatFormat = (time, format) => {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000,
    );
    return moment(fireBaseTime).format(format);

    // .format('HH:mm:ss')
  };
  dateFormat = date => {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      // nextDay: '[Tomorrow]',
      currentWeek: 'dddd',
      // nextWeek: 'dddd',
      lastDay: 'ddd',
      lastWeek: 'ddd',
      sameElse: 'DD MMM',
    });

  };
  chatDateFormat = date => {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      // nextDay: '[Tomorrow]',
      currentWeek: 'dddd',
      // nextWeek: 'dddd',
      lastDay: 'dddd',
      lastWeek: 'dddd',
      sameElse: 'MMMM DD, YYYY',
    });

  };
}
