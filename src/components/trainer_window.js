import React, {Component} from 'react';
import FlashCardsWindow from './flash_cards_window';
import PinyinTextBar from './pinyin_text_bar';
import StudySetItem from './study_set_item';
import UIWindow from './ui_window';
import ResponseBar from './response_bar';
import UserButtons from './user_buttons.js';
import audioMap from '../audio_map.js';

export default class TrainerWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      setItemList: [],
      currentCard: null,
      currentCardIndex: 0,
      setSize: 0,
      shuffle: 0,
      responseUrl: this.props.responseIcons[0]
    };

    this.checkUserSubmit = this.checkUserSubmit.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.playAudio = this.playAudio.bind(this);
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
          responseUrl: this.props.responseIcons[0]
        }
      );
    }

  }

  checkUserSubmit(answer) {
    if(answer.length != 0) {
      if(this.state.currentCard && answer === this.state.currentCard.props.term) {
        this.setState({responseUrl: this.props.responseIcons[2]});
      }

      else this.setState({responseUrl: this.props.responseIcons[1]});

      setTimeout(this.nextCard, 400);
    }
  }

  getRandomCardIndex(length) {
    return parseInt((Math.random() * length - 1) + 0);
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
          responseUrl: this.props.responseIcons[0]
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
        responseUrl: this.props.responseIcons[0]
      });

    if (this.state.currentCardIndex == this.state.setSize - 1) { //Reached The end of set list
      this.setState({currentCardIndex: 0, currentCard:this.state.setItemList[0]});
    }
  }

  playAudio() {
    var audio = new Audio(audioMap.get(this.state.currentCard.props.term));
    audio.play();
  }

  toggleShuffle() {
    var shuffle = (this.state.shuffle == 0) ? 1: 0;
    this.setState({shuffle: shuffle});
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
          url = {this.props.shuffleIcons[this.state.shuffle]} />
        <FlashCardsWindow currentCard = {this.state.currentCard}/>
        <UserButtons
          skipCard = {this.nextCard}
          rewindCard = {this.prevCard}
          playSound = {this.playAudio}/>
        <ResponseBar url = {this.state.responseUrl} />
        <PinyinTextBar onInputSubmit = {this.checkUserSubmit}/>
      </div>
    );
  }
}
