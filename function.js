// alert
const alertNotice = (sms) => {
  return alert(sms);
};

//create ls date
const createLsData = (key, data) => {
  //get the date
  const getAllData = localStorage.getItem(key);

  //store data val
  let listData = [];

  // data have
  if (getAllData) {
    listData = JSON.parse(getAllData);
  }

  //new data add to array
  listData.push(data);

  //all data passing to localstorege
  localStorage.setItem(key, JSON.stringify(listData));
};

const readLsData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const updateLsData = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};
