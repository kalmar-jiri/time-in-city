const cityInputElement = document.querySelector('#city');
const findBtn = document.querySelector('button');
const answerElement = document.querySelector('.answer');

const xhr = new XMLHttpRequest();
const url = 'https://api.api-ninjas.com/v1/worldtime?city=';
const apiKey = API_KEY;

const findTime = () => {
  const city = cityInputElement.value;
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
      answerElement.textContent = time;
      answerElement.classList.remove('hidden');
    } else {
      answerElement.textContent = `Request failed. Status: ${xhr.status}`;
    }
  };
  xhr.send();
};

findBtn.addEventListener('click', findTime);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    findTime();
  }
});
