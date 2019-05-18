//Expect toggleAll button to change all completed =false; to true;
// Hypothesis: toggleAll
// Add your code here

var todoList= {
	todos: [],

	displayTodos: function() {
		console.log('My Todos:');
  		if(this.todos.length === 0){
  		  console.log('Your todo list is empty');
  		}else{
  		  for(var i=0; i<this.todos.length; i++){
  		    if(this.todos[i].completed===true){
  		      console.log(' (x) ', this.todos[i].todoText);
  		    }else{
  		      console.log(' ( ) ', this.todos[i].todoText);
  		    }
  		  }
  		}
		},

	addTodo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});

		this.displayTodos();
    },

	changeTodo:function(position, todoText) {
		this.todos[position].todoText= todoText;
		this.displayTodos();
    },

	deleteTodo: function(position) {
		this.todos.splice(position, 1);
		this.displayTodos();
    },

	toggleCompleted: function(position) {
		var todo= this.todos[position];
		todo.completed = !todo.completed;
		this.displayTodos();
	},

		toggleAll: function(){
			var totalTodos=this.todos.length;
			var completedTodos= 0;

			for(var i =0; i<totalTodos; i++){
				if(this.todos[i].completed === true){
					completedTodos++;
				}
			}

			//If everythigns true, make everything false
			if(completedTodos === totalTodos){
				for(var i =0; i<totalTodos; i++){
					this.todos[i].completed = false;
				}
			}else{
				for(var i =0; i<totalTodos; i++){
					this.todos[i].completed = true;
				}
			}
			this.displayTodos();
		}
};

var handlers = {
	displayTodos: function(){
	  todoList.displayTodos();

	},
	addTodo: function(){
		debugger;
		var addTodoTextInput= document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value='';
		view.displayTodos();
	},
	changeTodo: function(){
		var changeTodoPositionInput= document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput= document.getElementById('changeTodoTextInput');

		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoTextInput.value='';
		changeTodoPositionInput.value='';
		view.displayTodos();
	},
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function(){
		var  toggleCompletedPositionInput= document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value='';
		view.displayTodos();
	},
	toggleAll: function(){
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos: function (){
		var todosUl= document.querySelector('ul');
		todosUl.innerHTML='';

		for(var i=0; i< todoList.todos.length; i++){
			var todosLi= document.createElement('li');
			var todo= todoList.todos[i];
			var todoTextWithCompletion= '';

			if(todo.completed===true){
				todoTextWithCompletion='(x)' + todo.todoText;
			}else{
				todoTextWithCompletion='( )' + todo.todoText;

			todosLi.id= i;
			todosLi.textContent = todoTextWithCompletion;
			todosLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todosLi);
			}
		}
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent='Delete';
		deleteButton.className='deleteButton';
		return deleteButton;
	},
	setUpEventListeners: function(){
		var todosUl  = document.querySelector('ul');
		todosUl.addEventListener('click', function(event){
			console.log(event.target.parentNode.id);

			//get the Element that was clicked on.
			var elementClicked = event.target;

			//check if ElementClicked is a delete button.
			if(elementClicked.className === 'deleteButton'){
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

view.setUpEventListeners();




//1.We want to get access to the display todos button
/* var displayTodosbutton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');

displayTodosButton.addEventListener('click', function(){
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
}); */
