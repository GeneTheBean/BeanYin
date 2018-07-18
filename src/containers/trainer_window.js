import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlashCardsWindow from '../components/flash_cards_window';
import PinyinTextBar from '../components/pinyin_text_bar';
import StudySetItem from '../components/study_set_item';
import UIWindow from '../components/ui_window';
import ResponseBar from '../components/response_bar';
import UserButtons from '../components/user_buttons.js';

class TrainerWindow extends Component {
  shuffleIcons = ['/img/icons/shuffle-icon-off.png', '/img/icons/shuffle-icon-on.png'];
  responseIcons = ['/img/icons/blank.png', '/img/icons/x_mark.png', '/img/icons/check_mark.png'];

  constructor(props) {
    super(props);

    this.state = {
      setItemList: [],
      currentCard: null,
      currentCardIndex: 0,
      setSize: 0,
      shuffle: 0,
      responseUrl: this.responseIcons[0]
    };

    this.checkUserSubmit = this.checkUserSubmit.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  updateCardSet(cardSet) {
    return cardSet.terms.map((term) => {
      var url = (term.image != null) ? term.image.url : '';

        return (
            <StudySetItem
              key = {term.id}
              definition = {term.definition}
              url = {url}
              term = {term.term}
            />
        );
      });
  }



  componentDidUpdate(prevProps) {

    if (this.props.activeSet !== prevProps.activeSet) {
      var setItemList = this.updateCardSet(this.props.activeSet);
      var index = (this.state.shuffle == 0) ? 0: this.getRandomCardIndex(setItemList.length);
      var currentCard = setItemList[index];

      this.setState(
        {
          setItemList: setItemList,
          currentCard: currentCard,
          setSize: setItemList.length,
          currentCardIndex: index,
          responseUrl: this.responseIcons[0]
        }
      );
    }

  }

  checkUserSubmit(answer) {
    if(answer.length != 0) {
      if(this.state.currentCard && answer === this.state.currentCard.props.term) {
        this.setState({responseUrl: this.responseIcons[2]});
      }

      else this.setState({responseUrl: this.responseIcons[1]});

      setTimeout(this.nextCard, 400);
    }
  }

  prevCard() {
    var index = this.state.currentCardIndex;

    if(this.state.shuffle) {
        index = this.getRandomCardIndex(this.state.setSize);
    }

    index--;

    if (index == -1) { //Reached The end of set list
      index = this.state.setSize - 1;
      this.setState({currentCardIndex: index,
                      currentCard:this.state.setItemList[index]});
    }

    else {
      this.setState(
        {
          currentCardIndex: index,
          currentCard: this.state.setItemList[index],
          responseUrl: this.responseIcons[0]
        });
    }
  }

  nextCard() {
    var index = this.state.currentCardIndex;

    if(this.state.shuffle) {
        index = this.getRandomCardIndex(this.state.setSize);
    }

    else index++;

    this.setState(
      {
        currentCardIndex: index,
        currentCard: this.state.setItemList[index],
        responseUrl: this.responseIcons[0]
      });

    if (this.state.currentCardIndex == this.state.setSize - 1) { //Reached The end of set list
      this.setState({currentCardIndex: 0, currentCard:this.state.setItemList[0]});
    }
  }

  toggleShuffle() {
    var shuffle = (this.state.shuffle == 0) ? 1: 0;
    this.setState({shuffle: shuffle});
  }

  getRandomCardIndex(length) {
    return parseInt((Math.random() * length - 1) + 0);
  }

  render() {

    if(!this.props.activeSet)  {
      return (
        <div className='select-set col-md-8' align='center'>
          <h2> Select a study set. </h2>
        </div>
      );
    }

    return (
      <div className='col-md-8'>
        <UIWindow
          toggleShuffle = {this.toggleShuffle}
          url = {this.shuffleIcons[this.state.shuffle]} />
        <FlashCardsWindow currentCard = {this.state.currentCard}/>
        <UserButtons
          skipCard = {this.nextCard}
          rewindCard = {this.prevCard}/>
        <ResponseBar url = {this.state.responseUrl} />
        <PinyinTextBar onInputSubmit = {this.checkUserSubmit}/>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    activeSet: state.activeSet
  }
}

export default connect(mapStateToProps)(TrainerWindow);
