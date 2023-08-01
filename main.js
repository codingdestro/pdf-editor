let fileBox = document.querySelector("#file-input");
let pageNo = document.querySelector("#page-no");
let filename = document.querySelector("#filename");
let pages = document.querySelector("#pages");
let addButton = document.querySelector("#add-btn");
let fromRange = document.querySelector("#fromRange");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let pagesArr = [];
let file = null;


fileBox.addEventListener("change", (e) => {
  file = e.target.files[0];
  filename.innerText = file.name;
});

const uploadFile = (url) => {
  let form = new FormData();
  if (!file) {
    alert("please select file");
    return;
  }
  form.append("pdf", file);
  form.append("pages", pagesArr || [1]);
  fetch(url, {
    method: "POST",
    body: form,
  })
    .then((e) => {
      return e.blob();
    })
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.download = "newpdf.pdf";
      a.href = url;
      document.body.append(a);
      a.click();
      a.remove();
    });
};


document
  .querySelector("#extract-page")
  .addEventListener("click", () =>
    uploadFile("http://localhost:8080/extractPages")
  );
document
  .querySelector("#remove-page")
  .addEventListener("click", () =>
    uploadFile("http://localhost:8080/removePages")
  );

const addPage = (val) => {
  pagesArr.push(parseInt(val) - 1);
  let li = document.createElement("li");
  li.classList.add("list");
  li.innerText = val;
  pages.append(li);
  document.querySelector("#pages-val").value = pagesArr;
};
addButton.addEventListener("click", () => {
  let val = pageNo.value;
  if (!val) return;
  pageNo.value = "";
  addPage(val);
});

fromRange.addEventListener("click", () => {
  let i = from.value;
  let j = to.value;
  if (i === 0 || j === 0 || i > j) return;
  pages.innerHTML = "";
  pagesArr = [];
  while (i <= j) {
    addPage(i);
    console.log(pagesArr);
    i++;
  }
});
