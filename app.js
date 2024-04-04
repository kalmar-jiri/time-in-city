const cityInputElement = document.querySelector('#city');
const findBtn = document.querySelector('button');
const answerElement = document.querySelector('.answer');
const windowElement = document.querySelector('.window');
const bodyElement = document.querySelector('body');

const xhr = new XMLHttpRequest();
const url = 'https://api.api-ninjas.com/v1/worldtime?city=';
const apiKey = API_KEY;

const findTime = () => {
  const city = cityInputElement.value;

  if (!city) return;

  xhr.open('GET', `${url}${city}`);
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-Api-Key', apiKey);
  xhr.onload = () => {
    if (xhr.status == 200) {
      const response = xhr.response;
      console.log(response);
      // "2047-02-24 13:02:42" -> [2047-02-24, 13:02:42] -> 13:02:42 -> ['13', '02', '42']
      const timeArr = response.datetime.split(' ')[1].split(':');
      // ['13', '02']
      timeArr.pop();
      // 13:02
      const time = timeArr.join(':');
      windowElement.style.height = '490px';
      answerElement.style.display = 'block';
      answerElement.textContent = time;
    } else {
      answerElement.textContent = 'ERROR!';
      windowElement.style.height = '490px';
      answerElement.style.display = 'block';
      answerElement.style.fontSize = '5rem';
      windowElement.style.boxShadow = '5px 5px 40px red';
    }
  };
  xhr.send();
};

cityInputElement.addEventListener('click', () => {
  cityInputElement.value = '';
  windowElement.style.height = '260px';
  answerElement.style.display = 'none';
  windowElement.style.boxShadow = '5px 5px 40px black';
});

findBtn.addEventListener('click', findTime);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    findTime();
  }
});
