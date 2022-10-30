
$(document).ready(function(event) {

    // global variables
    const sentences = ["Above all, don't lie to yourself. The man who lies to himself and listens to his own lie comes to a point that he cannot distinguish the truth within him, or around him, and so loses all respect for himself and for others. And having no respect he ceases to love.",
"Pain and suffering are always inevitable for a large intelligence and a deep heart. The really great men must, I think, have great sadness on earth."
,"To go wrong in one's own way is better than to go right in someone else's."
, "People speak sometimes about the \"bestial\" cruelty of man, but that is terribly unjust and offensive to beasts, no animal could ever be so cruel as a man, so artfully, so artistically cruel."
,"Talking nonsense is the sole privilege mankind possesses over the other organisms. It's by talking nonsense that one gets to the truth! I talk nonsense, therefore I'm human."
, "What Is Love? I have met in the streets a very poor young man who was in love. His hat was old, his coat worn, the water passed through his shoes and the stars through his soul."
, "Love is like a tree: it grows by itself, roots itself deeply in our being and continues to flourish over a heart in ruin. The inexplicable fact is that the blinder it is, the more tenacious it is. It is never stronger than when it is completely unreasonable."
,  "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known."
, "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You are on your own. And you know what you know. And YOU are the one who’ll decide where to go…"
, "All the girls in the world were divided into two classes: one class included all the girls in the world except her, and they had all the usual human feelings and were very ordinary girls; while the other class -herself alone- had no weaknesses and was superior to all humanity."
, "I never could have done what I have done, without the habits of punctuality, order, and diligence, without the determination to concentrate myself on one object at a time."
, "At the temple there is a poem called \"Loss\" carved into the stone. It has three words, but the poet has scratched them out. You cannot read loss, only feel it."
, "We are but the veriest, sorriest slaves of our stomach. Reach not after morality and righteousness, my friends; watch vigilantly your stomach, and diet it with care and judgment. Then virtue and contentment will come and reign within your heart, unsought by any effort of your own; and you will be a good citizen, a loving husband, and a tender father—a noble, pious man."
, "There is one thing, Emma, which a man can always do if he chooses, and that is his duty; not by manoeuvring and finessing, but by vigour and resolution."
, "There is one thing, Emma, which a man can always do if he chooses, and that is his duty; not by manoeuvring and finessing, but by vigour and resolution."
, "You are a wonderful creation. You know more than you think you know, just as you know less than you want to know."
, "It is funny. All one has to do is say something nobody understands and they will do practically anything you want them to."
, "I loved her against reason, against promise, against peace, against hope, against happiness, against all discouragement that could be."
, "If you loved someone, you loved him, and when you had nothing else to give, you still gave him love."
, "Well, I must endure the presence of a few caterpillars if I wish to become acquainted with the butterflies."
];
    let sentence = sentences[Math.floor(Math.random()*sentences.length)] ;
    rotation = 0;



    // keyboard

    function keyboardAnimation(e){
        var eventName = e.code.toString();
        var s =  e.key;
        if(!$(`#${eventName}`).hasClass("keyPressed"))
        {
            if(s.match(/[a-z]/i) && s.length === 1)
                if ( (s.toUpperCase() === s && !e.shiftKey) ||
                (s.toLowerCase() === s && e.shiftKey) ) {
                    try{
                        $(".key").addClass("capsOnKeys");
                        $(`#CapsLock`).addClass("capsOn");
                    }
                    catch (error) {
                        console.log(error);
                    }
                } 

            if(eventName === 'CapsLock')
                {
                    $(".key").toggleClass("capsOnKeys");
                    $(`#${eventName}`).toggleClass("capsOn");
                }

            $(`#${eventName}`).toggleClass("keyPressed");
        }
    }
   


    // input

    // empty input field when document loads
    $('#text-input').val('');


    function identicalStrings(s1,s2){

        for(var i=0; i < s2.length; i++)
            if(s1[i] !== s2[i])
                return false;
        return true;
    }

    function initiateWords(){
        $("#next-words").html(`${sentence.split(" ").splice(0, 5).join(" ")}`);
        $("#firstWord").html(`${$("#next-words").text().split(" ")[0]}`);
        $("#next-words").html(`${$("#next-words").text().split(" ").slice(1).join(" ") + " " + 
        sentence.split(" ")[5]}`);
        sentence = sentence.split(" ").slice(6).join(' ');
    }

    function nextWord(){


        if($("#firstWord").text())
        {
            $("#firstWord").html(`${$("#next-words").text().split(" ")[0]}`);
            $("#next-words").html(`${$("#next-words").text().split(" ").slice(1).join(" ") + " " + 
            sentence.split(" ")[0]}`);
            sentence = sentence.split(" ").slice(1).join(' ');
        }

        if(sentence.length === 0)
            sentence = sentences[Math.floor(Math.random()*sentences.length)];

    }

    function inputTextMatchingOnKeyDown(e){
        var textInput, firstWord;
        textInput = $("#text-input").val();
        firstWord = $("#firstWord").text();

        if((e.key).length === 1)
            textInput += e.key;
        if(e.key === "Backspace")
            textInput = textInput.slice(0, -1);
        
        if(textInput.length > firstWord.length)
            {
                if(e.code !== "Space")
                    $("#firstWord").html(`<span class="notMatching">${firstWord}</span>`);
                else
                        if(identicalStrings(textInput, firstWord) && firstWord.length > 0)
                            $("#correct-words").text(`${parseInt($(".count").text())  + 1}`);
                return;
            }

        var matching = "";
        for(var i=0; i < textInput.length; i++)
            if(textInput[i] === firstWord[i])
                matching += `<span class="matching">${textInput[i]}</span>`;
            else if(firstWord[i])
                matching += `<span class="notMatching">${firstWord[i]}</span>`;

        $("#firstWord").html(`${matching}${firstWord.slice(textInput.length)}`);
    }


    function spacePressed(e){
        if(e.code === "Space"){
            if($("#firstWord").text())
            {
                nextWord();
                document.getElementById('text-input').value = ''
            }
        }
        
        
    }

    function clearCTRLDEL(e){
        if ( e.ctrlKey && ( e.which === 8 ) ) 
            $("#firstWord").html(`${$("#firstWord").text()}`);
          
    }

    initiateWords();
    // events on keydown
    $("#text-input").keydown((e) => {
        inputTextMatchingOnKeyDown(e);
        keyboardAnimation(e);
        countdown(60);
    });

    $(".restart-input").click(function(){
        sentence = sentences[Math.floor(Math.random()*sentences.length)];
        initiateWords();
        document.getElementById('text-input').value = ''
        $(".timer").text(`1:00`);
        $("#seconds").text(`${0}`);
        $("#correct-words").text(`${0}`);
        rotation += 360;
        $("#rotate-img").css({
            'transform-origin': 'center',
            'transform':`rotate(${rotation}deg)`
        });

    });

    
    // events on keyup
    $("#text-input").keyup((e) => {
    var eventName = e.code.toString();
    clearCTRLDEL(e);
    setTimeout(() => {$(`#${eventName}`).removeClass("keyPressed");}, 100);
    spacePressed(e);
    });
    
function countdown(duration){
    if(!$(".timer").hasClass("countdownActive"))
    {
        var wasClicked = 0;
        $(".timer").addClass("countdownActive");
        var x = setInterval(function() {
        duration--;
        var sec_format;;
        if(duration < 9)
            sec_format = '0' + duration;
        else 
            sec_format = duration;
        $(".timer").text(`0:${sec_format}`);

        $(".restart-input").click(function(){
             wasClicked = 1;
        }); 
        
        if($("#firstWord").text() && !wasClicked)
            $("#seconds").text(`${60 - duration}`);

        if(duration <= 0 || !$("#firstWord").text() || wasClicked === 1)
            {
                
                clearInterval(x);
                $(".timer").text(`1:00`);
                $(".timer").removeClass("countdownActive");
                if(duration <= 0 || !$("#firstWord").text())
                    {
                        $("#next-words").text(`${Math.floor(parseInt($(".count").text()) * 60 / parseInt($("#seconds").text()))}WPM`);
                        $("#firstWord").text("");
                        document.getElementById('text-input').value = ''
                    }
            }
    }, 1000);
    }
    
}



});


