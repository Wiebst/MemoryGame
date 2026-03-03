var openCardsCount = 0;

function shuffleCards()
{
    var cardsArr = $('main').children().get()
    cardsArr.sort(() => Math.random() - 0.5)
    
    $('main').empty()
    $('main').append(cardsArr)
}

function closeAllCards() {
    $('main').children().filter('.card-open').removeClass('card-open').addClass('card-closed');
    $('main .card-closed p').addClass('card-text-hidden');
    openCardsCount = 0;
}

function checkCardsMatch() {
    if(openCardsCount == 2)
    {
        let openCards = $('main .card-open');
        let text1 = openCards.eq(0).find('p').text();
        let text2 = openCards.eq(1).find('p').text();

        if(text1 != text2)
        {
            setTimeout(closeAllCards, 2000)
        }
        else
        {
            openCardsCount = 0;
            openCards.removeClass('card-open').addClass('card-matched');
            matchedCards = $('main .cards-matched');

            checkWin()
        }
    }
}

function checkWin()
{
    let matchedCards = $('main .card-matched').length;

    if(matchedCards == 10)
    {
        const winMessage = document.createElement('div');
        winMessage.textContent = 'Yeeeeeeeees! You win!';
        winMessage.className = 'winMessage';
        document.body.appendChild(winMessage);
    }
}


$('#startBtn').on('click', function() {
    if($('#startBtn').text() == 'START')
    {
        $('#startBtn').text('FINISH');
        $('main').children().removeClass('card-open').addClass('card-closed');
        $('main p').addClass('card-text-hidden');
        shuffleCards();
        openCardsCount = 0;
    }
    else
    {
        $('#startBtn').text('START');
        $('main').children().removeClass('card-closed').addClass('card-open');
        $('main p').removeClass('card-text-hidden');
    }
});



$('main').on('click', 'button', function() {
    if ($('#startBtn').text() == 'FINISH' && openCardsCount < 2 && $(this).hasClass('card-closed')) {
        $(this).removeClass('card-closed').addClass('card-open');
        $(this).children().removeClass('card-text-hidden');
        openCardsCount += 1;

        checkCardsMatch();
    }
})
