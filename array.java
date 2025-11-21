<html>
    <head>
        <title>Shopping List</title>

    </head>
    <body>
        <h1>My Shopping List</h1>
        <ul id="shopping list"></ul>
        <script>
            const shoppingItems = ["Milk","Bread","Eggs","Apples"];

            function addItem(){
                const newItem = document.getElementById("newItemInput").value;
                shoppingItems.push(newItem);
                updateList();
            }
            function updateList(){

                const listElement = document.getElementById("shoppingList");
                listElement.innerHTML="";


                for (let i =0; i< shoppingItems.length; i++){
                    const item = shoppingItems[i];
                    const listItem = document.createElement("li");
                    listItem.textContent=item;
                    listElement.appendChild(listItem);
                }
            }
            updateList();
         </script>
        <br>
        <input type="text" id="newItemInput" placeholder="Enter new item">
        <button onclick="addItem()">Add Item</button>
    </body>
</html>