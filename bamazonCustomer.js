// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
// queries go here
initialDisplay();
  });


    // Initial Display Function
    function initialDisplay() {
        console.log("Displaying all products \n");
        connection.query("SELECT item_id, product_name, price FROM products",
        
        
        function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
        pickProduct();
        });
      }



// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.

function showProducts(answer) {
    var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
    connection.query(query,  function(err, res) {
      
            console.table(res);


      pickProduct();
    });
}

// 6. The app should then prompt users with two messages.

function pickProduct(answer) {
    //    * The first should ask them the ID of the product they would like to buy.

    inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to purchase"
      },
      //    * The second message should ask how many units of the product they would like to buy.
      {
        name: "count",
        type: "input",
        message: "How many would you like to buy?"
      }

      ]).then(function(answer) {
          // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
          connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",
            {item_id: answer.item},  function(err, res) {

              //console.log("count " + answer.count);
              if (parseInt(answer.count) > res[0].stock_quantity) {

                //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
                console.log("sorry, there are only " + res[0].stock_quantity + " left");
                pickProduct();

              }

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.

              else {
                console.log("Your purchase of " + answer.count + ' ' + res[0].product_name +"/s total cost is: $ " + parseFloat(res[0].price) * parseInt(answer.count));
               var quantityLeft = res[0].stock_quantity - answer.count;
                    //   console.log(quantityLeft);
                      connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: quantityLeft
                          },
                          {
                            item_id: answer.item
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                         
                         
                        }); 
                      console.log("Inventory updated. There are  " + quantityLeft + " left"); 
                      showProducts();
               }


            })
      });

};   


// * If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.