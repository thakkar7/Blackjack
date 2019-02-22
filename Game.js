var allCards = []; 
var dealer = [];
var dealerSum=0 ;
var total_round=0;
 var firstdeal={};
var card_deck; 
var initial_cards, player_initial=0, dealer_initial=0;
var random_card;
var index_of_random;
var bid_money = 0;
var total_money=0;
var deal_cards = false;
var p_ace = 0;
var d_ace = 0;
var rounds_left=10;



var player_info = {
	name:localStorage.getItem("name"),
	amount:localStorage.getItem("amount"),
	playerSum : 0,
	playercard : [],
	curr_win : 0,
  tot_bets : 0,
	bet : 0
};


document.getElementById("player_name").innerHTML = player_info.name;
document.getElementById("total_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.amount} </b></div>`;
document.getElementById("rounds_left").value = `Rounds left = ${rounds_left}`;
document.getElementById("hit").disabled = true;
document.getElementById("stand").disabled = true;
         
        // for(i=1;i<=number;i++)
        // {
        // 	player_info[i]={
        // 		name : localStorage.getItem(i),
        // 		amount : parseInt(localStorage.getItem(10*i)),
        // 		playerSum : 0,
        // 		playercard : [],
        // 		curr_win : 0,
        // 		bet : 0

        // 	}

        // }

 axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
   	.then(function (response) {
   			card_deck = response.data;
        firstdeal = card_deck.cards;
 

          for (var i = 0; i < 52; i++) {
    
            if(firstdeal[i].value == "KING" || firstdeal[i].value == "QUEEN" || firstdeal[i].value == "JACK") {
    
                firstdeal[i].value = 10;
            }
    
            if(firstdeal[i].value == "ACE") {
    
                firstdeal[i].value = 11;
            }
                  
            if(firstdeal[i].value != "KING" && firstdeal[i].value != "QUEEN" && firstdeal[i].value != "JACK" && firstdeal[i].value != "ACE") {
    
                firstdeal[i].value = parseInt(firstdeal[i].value);
            }
          }


        allCards=firstdeal;
    })


    function Add_5(){
      if(player_info.amount<5)
      {
          document.getElementById("5$").disabled = true;
          document.getElementById("10$").disabled = true;
          document.getElementById("25$").disabled = true;
          return;
      }
        player_info.bet+=5;
        player_info.amount-=5;
        document.getElementById("bid_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.bet} </b></div>`;
        document.getElementById("total_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.amount} </b></div>`;
            }

    function Add_10(){
      if(player_info.amount<10)
      {
          // document.getElementById("5$").disabled = true;
          document.getElementById("10$").disabled = true;
          document.getElementById("25$").disabled = true;
          return;
      }
        player_info.bet+=10;
        player_info.amount-=10;
        document.getElementById("bid_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.bet} </b></div>`;
        document.getElementById("total_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.amount} </b></div>`;
            }

    function Add_25(){
      if(player_info.amount<25)
      {
          // document.getElementById("5$").disabled = true;
          // document.getElementById("10$").disabled = true;
          document.getElementById("25$").disabled = true;
          return;
      }
        player_info.bet+=25;
        player_info.amount-=25;
        document.getElementById("bid_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.bet} </b></div>`;
        document.getElementById("total_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.amount} </b></div>`;

    }
 
		
    function deal(){

          if(player_info.bet==0)
          {
            alert('Bet amount should be greater than 0');
            return;
          }
          document.getElementById("5$").disabled = true;
          document.getElementById("10$").disabled = true;
          document.getElementById("25$").disabled = true;
          document.getElementById("deal").disabled = true;
          document.getElementById("hit").disabled = false;
          document.getElementById("stand").disabled = false;
        
        	for(var j=1; j<=2; j++) 
        	{

            	initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
            	allCards.splice(initial_cards,1);
           		player_info.playerSum+=initial_cards.value;
           		console.log(player_info.playerSum);
            	player_info.playercard.push(initial_cards);
              if(initial_cards.value==11)
                p_ace++;

              // document.getElementById("player").innerHTML+= `<img src= ${initial_cards.image} style="height=5% width=5%">`;
              document.getElementById("player").innerHTML+= `<img src= ${initial_cards.image} style="display: inline-block;float:left;margin: 0px;padding: 0px;max-height:250px">`;
        	}
        

            initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
            allCards.splice(initial_cards,1);
            if(initial_cards.value==11)
                d_ace++;
            dealerSum = dealerSum+(initial_cards.value);
            dealer.push(initial_cards);
            document.getElementById("dealer").innerHTML+= `<img src= ${initial_cards.image} style="display: inline-block;float:left;margin: 0px;padding: 0px;max-height:250px">`;
          }


      	function count(){
						  
							   while(dealerSum<17)
								    Dealerhit();

							  setTimeout(function(){
                        check()},2000);
						  
      	}



        function check()
        		{ 
        			
        				console.log("yeh chal gaya");
                if(player_info.playerSum<=21 && dealerSum<=21 && dealerSum==player_info.playerSum)
                {
                  alert(`Round tied.$${player_info.bet} placed back in total amount`);
                  player_info.bet=0;
                }
        				else if((player_info.playerSum>21))
        				{
        					// player_info.curr_win = 0;
                  // player_info.amount-= (player_info.bet);
                  alert(`Dealer Won. You lost $${player_info.bet}`)
                  player_info.bet=0;
        				}
        				else if(((player_info.playerSum>dealerSum)&&(player_info.playerSum<=21)&&(dealerSum<=21))||(dealerSum>21))
        				{
        					player_info.curr_win +=1;
        					player_info.amount += (2*player_info.bet);
                  alert(`You Won! Total amount increased by $${player_info.bet}`)
        					player_info.bet=0;
        				}
        				else
        				{
        					// player_info.amount-= (player_info.bet);
                  alert(`Dealer Won. You lost $${player_info.bet}`)
                  player_info.bet=0;
        				}

                total_round++;
                rounds_left = 10 - total_round;
                player_info.playerSum=0;
                dealerSum=0;
                player_info.playercard=[];
                dealer=[];
                p_ace=0;
                d_ace=0;
                document.getElementById("rounds_left").value = `Rounds left = ${rounds_left}`;
                document.getElementById("player").innerHTML = "";
                document.getElementById("dealer").innerHTML = "";
                document.getElementById("total_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.amount} </b></div>`;
                document.getElementById("bid_amount").innerHTML = `<div style="font-size:20px"><b> ${player_info.bet} </b></div>`;

                document.getElementById("5$").disabled = false;
                document.getElementById("10$").disabled = false;
                document.getElementById("25$").disabled = false;
                document.getElementById("deal").disabled = false;
                document.getElementById("hit").disabled = true;
                document.getElementById("stand").disabled = true;
                if(total_round==10 || player_info.amount==0)
                {
                    document.getElementById("modal_body").innerHTML += `<div> Total hands won : ${player_info.curr_win} out of ${total_round} rounds <br> You started with 
                    ${localStorage.getItem("amount")} and ended up at ${player_info.amount} <br> Thanks for playing Blackjack!</div>`
                    $("#result").modal('show');

                document.getElementById("5$").disabled = true;
                document.getElementById("10$").disabled = true;
                document.getElementById("25$").disabled = true;
                document.getElementById("deal").disabled = true;
                document.getElementById("hit").disabled = true;
                document.getElementById("stand").disabled = true;
                }
        		}
        		


            function hit(){

            			   //console.log(allCards);
               			 random_card = allCards[Math.floor(Math.random()*allCards.length)];
               			 console.log(random_card);
               			 index_of_random = allCards.indexOf(random_card);
               			 allCards.splice(index_of_random,1);
                     player_info.playercard.push(random_card);
                     player_info.playerSum += random_card.value;
                     if(random_card.value==11)
                      p_ace++;

                     document.getElementById("player").innerHTML+= `<img src= ${random_card.image} style="display: inline-block;float:left;margin: 0px;padding: 0px;max-height:250px">`;
                    

                		if(player_info.playerSum > 21 && p_ace>0) 
                    {
                              player_info.playerSum -=10;
                              p_ace--;
            	      }
                    else if(player_info.playerSum > 21 && p_ace==0)
                      setTimeout(function(){
                        check()},2000);
            }

          		function Dealerhit()
                    {
                        console.log("yeh chala");
                        random_card = allCards[Math.floor(Math.random()*allCards.length)];
                        index_of_random = allCards.indexOf(random_card);
                        allCards.splice(index_of_random,1);
                        dealer.push(random_card);
                        dealerSum+=random_card.value;

                        document.getElementById("dealer").innerHTML+= `<img src= ${random_card.image} style="display: inline-block;float:left;margin: 0px;padding: 0px;max-height:250px">`;
    

                        if(random_card.value==11)
                          d_ace++;
                        if(dealerSum > 21 && d_ace>0) 
                          {
                              dealerSum -=10;
                              d_ace--;
                          }
                   }      

              function Quit(){
                window.location.href = "index.html";
              }  