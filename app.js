let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let taskName = document.querySelector('#time #taskName');

class Tasks{
    constructor(){
        this.id = '';
        this.title = '';
        this.completed = false;
    }

    setID(){
        const id = (Math.random() * 100).toString(36).slice(3)
        this.id = id;
    }

    setTitle(value){
        this.title = value;
    }

    setStatus(){
        this.completed = false;
    }


}

class ListTasks{
    constructor(){
        this.lista = []
    }

    addTasks(value){
        this.lista.push(value)
    }


    renderTasks(){
        document.getElementById('tasks').innerHTML = '';

        this.lista.forEach(tasks => {
            document.getElementById('tasks').innerHTML += `
            <div class='task'>
            <div class='completed'>${tasks.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id="${tasks.id}">Start</button>`}</div>
            <div class='title'>${tasks.title}</div>
        </div>
            `
        });

        const startButtons = document.querySelectorAll('.task .start-button');

        startButtons.forEach(button => {
            button.addEventListener('click', ()=>{
                if (!timer) {
                    const id = button.getAttribute('data-id')
                    this.startButtonsHandler(id);
                    button.textContent = 'In Progress...'
                }
            })
        });
    }

    startButtonsHandler(id){
        time = 25 * 60;
        current = id;
        const taskIndex = this.lista.findIndex(task => task.id === id);
        taskName.textContent = this.lista[taskIndex].title;
        this.renderTime();

        timer = setInterval(()=>{
            this.timerHandler(id)
        }, 1000)
    }

    timerHandler(id){
        time--;
        this.renderTime()

        if (time == 0) {
            clearInterval(timer);
            this.markCompleted(id);
            timer = null;
            this.renderTime();
            this.startBreak();
            
        }
    }

    startBreak(){
        time = 5 * 60
        taskName.textContent = 'Break';
        this.renderTime();

        timerBreak = setInterval(()=>{
            this.timerBreakHandler();
        }, 1000)
        
    }

    timerBreakHandler(){
        time--;
        this.renderTime();

        if (time == 0) {
            clearInterval(timerBreak);
            current = null;
            timerBreak = null;
            taskName.textContent = ''
            this.renderTime();
        }
    }

    markCompleted(id){
        const taskIndex = this.lista.findIndex(task => task.id ===id);
        this.lista[taskIndex].completed = true
        this.renderTasks()
    }

    renderTime(){
        const timeDiv = document.getElementById('value');
        const minutes = parseInt(time / 60)
        const seconds = parseInt(time % 60)

        timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    }

}

const listTasks = new ListTasks();

document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const tasks = new Tasks();
    tasks.setID()

    let title = document.getElementById('itTask').value;
    tasks.setTitle(title);

    tasks.setStatus();


    listTasks.addTasks(tasks)
    document.getElementById('itTask').value = '';
    console.log(`Tarea Agregada`);

    listTasks.renderTasks();


})