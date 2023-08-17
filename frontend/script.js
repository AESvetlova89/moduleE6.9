const btnRegister = document.querySelector('#btn-register');
const btnLogin = document.querySelector('#btn-login');
const output = document.querySelector('.output')

//регистрация
btnRegister.addEventListener('click', register)

// авторизация
btnLogin.addEventListener('click', checkLogin)

function register()
{
  // Находим наши данные с формы
  const username = document.querySelector('#username').value
  const age = document.querySelector('#age').value
  // console.log(`Username is ${username}, Age is ${age}`)

  //   Настраиваем наш запрос
  const options = {
  // Будем использовать метод POST
  method: 'POST',
  // Добавим тело запроса
  body: JSON.stringify({
    personName: username,
    personAge: age,
  }),
  // Дополнительный заголовое с описанием типа данных,
  // которые мы отправляем серверу. В данном случае
  // сервер jsonplaceholder будет знать, как ему
  // обрабатывать запрос
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  }
  //   Делаем запрос за данными
  fetch('http://127.0.0.1:8000/api/person/',options)
}


function checkLogin()
{
  // Находим наши данные с формы
  let flag = false; // для вывода сообщения что удача или провал
  const username = document.querySelector('#username-login').value
  const age = document.querySelector('#age-login').value
  console.log(`Username is ${username}, Age is ${age}`)
  console.log('Choose please user from collection under to check success login :)')
  let data;
  //   Делаем запрос что бы получить всех пользователей
  fetch('http://127.0.0.1:8000/api/person/')
    .then(response => response.json())
    .then(json => {
      data = json;
      console.log(data);

      for (let person of data)
      {
        if (person.personName == username && person.personAge == age)
        {
          writeValidMessage('You have successfully registered')
          flag = true;
          btnLogin.removeEventListener('click', checkLogin) //ТУТ ПРОБУЮ УБРАТЬ ОБРАБОТЧИК
          break;
        }
      }
      if (!flag){writeInvalidMessage('Something went wrong');clearMessages();}

    })
}



function writeValidMessage(message){
  let mes = document.createElement("h4");
  mes.style.color = "green";
  mes.innerHTML = message;
  output.appendChild(mes);
}

function writeInvalidMessage(message){
  let mes = document.createElement("h4");
  mes.style.color = "red";
  mes.innerHTML = message;
  output.appendChild(mes);
}

function clearMessages(){
  setTimeout(()=> {
    let output = document.querySelector('.output')
    let first_message = output.firstChild
    output.removeChild(first_message)
  },3000)
}