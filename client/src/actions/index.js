import { api } from '../api/api';
import { setJwtToStorage , setUserIdToStorage} from '../utils/utils';

export function getContactsFor() {
  return new Promise((resolve, reject) => {
    api.get(`/api/me/contacts`).then(res => {
      if (res.statusText === "OK") {
        const contacts = res.data.data.map(contact => {
          contact.key = contact.ID;
          return contact;
        })
        resolve(contacts)
      } else {
        reject(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function createContact(values) {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      name: values.name,
      phone: values.phone
    });
    api.post(`/api/contacts/new`, data)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
  })
}

export function authenticate(values) {
  return new Promise((resolve, reject) => {
    api.post(`/api/user/login`, {
      "email": values.email,
      "password": values.password
    }).then( res => {
      if(res.statusText === "OK"){
        setJwtToStorage(res.data.account.token);
        setUserIdToStorage(res.data.account.ID);
        resolve(res.data);
      } else{
        reject(res);
      }
    }).catch(err => {
      reject(err);
    });
  })
}

export function createAccount(values) {
  return new Promise((resolve, reject) => {
    api.post(`/api/user/new`, {
      "email": values.email,
      "password": values.password
    }).then( res => {
      if(res.data.status){
        // setJwtToStorage(res.data.account.token);
        // setUserIdToStorage(res.data.account.ID);
        resolve(res);
      } else {
        reject(res);
      }
    }).catch( err => {
      reject(err);
    });
  })
  
}