//definim functia care va lua datele si le returneaza prin fetch
const getData=(url)=>{
    return fetch(url).then((res)=>res.json())
}

const userUrl='https://jsonplaceholder.typicode.com/users'
const todoUrl = 'https://jsonplaceholder.typicode.com/todos' //adaugam listele 
//
const divMain = document.getElementById('div')


//facem functia parent, cea mai principala
const render = (list, name) => {
    const div = document.createElement('div');
    const list1 = document.createElement('ul')
    const title = document.createElement('p');

    title.innerText = name;
    list1.classList.add('list')
//creem list item si le dam continut
    list.forEach((toDo) => {
        const li = document.createElement('li');
        li.innerText = toDo.title
        list1.appendChild(li);

//cream un if care in cazul todo-ului completat va adauga clasa 'completed din css, si iconita
        if(toDo.completed){
            li.classList.add('completed')
            
        
//adaugam iconita in interiorului block if, am incercat inafara si se punea la toate li-urile 
        const doneIcon = document.createElement('img')
        doneIcon.src='./tick.png'
        doneIcon.classList.add('done-icon')

//adugam iconita ca copilul la list item
        li.appendChild(doneIcon)
        }
    })
//adaugam titlul si lista ca copil la div
    div.appendChild(title);
    div.appendChild(list1);

    divMain.appendChild(div)
  
}

//folosim promise all, pentru a lua datele din 2 surse
Promise.all ([ //avemv 2 promisuri
    getData(userUrl),//un promise pentru useri, pentru a lua datele de acolo
    getData(todoUrl) // un promis pentru todo-uri 
]).then(([users,todos]) =>{ //primeste ,un array cu 2 array-uri

    users.forEach((user)=>{//iteram prin fiecare user
        //prin filter obtinem todo-urile pe fiecare utilizator
        const todoList = todos.filter((toDo)=>toDo.userId === user.id)
        render(todoList,user.name)
            
        })
    }).catch(err=>console.log(err))

