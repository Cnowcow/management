import logo from './logo.svg';
import './App.css';
import Customer from "./components/Customer";
import customer from "./components/Customer";

const customers = [
  {
    'id' : 1,
    'image' : 'http://hhjnn92.synology.me/marketFile/default.png',
    'name' : '최현우',
    'birthday' : '920514',
    'gender' : '남자',
    'job' : '개발자'
  },
  {
    'id' : 2,
    'image' : 'http://hhjnn92.synology.me/marketFile/default.png',
    'name' : '홍길동',
    'birthday' : '920000',
    'gender' : '남자',
    'job' : '개발자'
  },
  {
    'id' : 3,
    'image' : 'http://hhjnn92.synology.me/marketFile/default.png',
    'name' : '임꺽정',
    'birthday' : '900000',
    'gender' : '남자',
    'job' : '개발자'
  }
]

function App() {
  return (
      <div>
        {
          customers.map(c => {
            return (
                <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
            );
          })
        }
      </div>
  );
}

export default App;
