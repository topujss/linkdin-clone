// pop box call
const popbtn = document.querySelector('.postbtn');
const postPopBox = document.querySelector('#postPopBox');
const eidtPopBox = document.querySelector('#eidtPopBox');
const closeBtn = document.querySelector('.closeBtn');
const closeBtnedit = document.querySelector('.closeBtneidt');
popbtn.onclick = () => {
  postPopBox.style.display = 'block';
};
closeBtn.onclick = () => {
  postPopBox.style.display = 'none';
};
closeBtnedit.onclick = () => {
  eidtPopBox.style.display = 'none';
};

//get element
const postForm = document.querySelector('#postForm');
const editForm = document.querySelector('#editForm');

// when form submit
postForm.onsubmit = (e) => {
  e.preventDefault();

  // get data
  const formVal = new FormData(e.target);
  const value = Object.fromEntries(formVal.entries());
  const { name, userPhoto, bgPhoto, userContent } = Object.fromEntries(formVal.entries());

  if (!name || !userPhoto) {
    alertNotice('need input');
  } else {
    const id = Math.floor(Math.random() * 1000) + '_' + Date.now();

    const datay = { ...value, id };

    createLsData('in', datay);

    e.target.reset();

    // show data
    displayData();

    // use it when needed
    postPopBox.style.display = 'none';
  }
};

const show = document.querySelector('.allPost');
const displayData = () => {
  const allData = readLsData('in');

  let val = [];

  if (!allData || allData.length == 0) {
    val = '';
  }

  if (allData) {
    allData.reverse().map((item) => {
      val += `
      <div class="post" style="margin-top: 10px;">
      <div class="post__header">
            <img src="${item.userPhoto}" class="material-icons sidebar__topAvatar" alt="" />
            <div class="post__info">
              <h2>${item.name}</h2>
              <p>${item.Jtitle}</p>
            </div>
          </div>

          <div class="post__body">
            <p>${item.userContent}</p>
            <img src="${item.bgPhoto}" class="bg-img" alt="" />
          </div>

          <div class="feed__inputOptions">
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> thumb_up </i>
              <h4>Like</h4>
            </div>
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> comment </i>
              <h4>Comment</h4>
            </div>
            <div class="inputOption" editList="${item.id}">
              <i style="color: gray"  class="material-icons"> edit </i>
              <h4>Edit</h4>
            </div>
            <div class="inputOption" deleteList="${item.id}">
              <i style="color: gray" class="material-icons"> delete </i>
              <h4>Delete</h4>
            </div>
          </div>
          </div>`;
    });

    // show post
    show.innerHTML = val;
  }
};
show.onclick = (e) => {
  if (e.target.hasAttribute('editList')) {
    const id = e.target.getAttribute('editList');
    eidtPopBox.style.display = 'block';

    // readLsData
    const allData = readLsData('in');

    const data = allData.find((data) => data.id == id);
    editForm.innerHTML += `
    <div class="popbody">
            <div>
              <label for="">Name</label>
              <input name="name" value="${data.name}" type="text" />
              <input name="id" value="${data.id}" type="hidden" />
            </div>
            <div>
              <label for="">Job title</label>
              <input name="Jtitle" value="${data.Jtitle}" type="text" />
            </div>
            <div>
              <label for="">UserPhoto</label>
              <input name="userPhoto" value="${data.userPhoto}" type="text" />
            </div>
            <div>
              <label for="">BG image</label>
              <input name="bgPhoto" value="${data.bgPhoto}" type="text" />
            </div>
            <div>
              <label for="">Content</label>
              <textarea name="userContent" cols="30" rows="10">${data.userContent}</textarea>
            </div>
            <div>
              <input class="submitBtn" type="submit" value="Edit post" />
            </div>
          </div>`;
  }

  // delete data
  if (e.target.hasAttribute('deleteList')) {
    const id = e.target.getAttribute('deleteList');

    if (confirm('Are you sure!') == true) {
      const allData = readLsData('in');

      const index = allData.findIndex((data) => data.id == id);

      allData.splice(index, 1);

      updateLsData('in', allData);
      displayData();
    }
  }
};
displayData();

editForm.onsubmit = (e) => {
  e.preventDefault();

  const formVal = new FormData(e.target);
  const value = Object.fromEntries(formVal.entries());
  const { name, userPhoto, bgPhoto, userContent, id, Jtitle } = Object.fromEntries(
    formVal.entries()
  );

  let allData = readLsData('in');

  const index = allData.findIndex((data) => data.id == id);

  allData[index] = { name, userPhoto, bgPhoto, userContent, id, Jtitle };

  //update ls data
  updateLsData('in', allData);

  //show data
  displayData();

  //edit form none
  eidtPopBox.style.display = 'none';
};
