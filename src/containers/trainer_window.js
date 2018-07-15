import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlashCardsWindow from '../components/flash_cards_window';
import PinyinTextBar from '../components/pinyin_text_bar';
import StudySetItem from '../components/study_set_item';

class TrainerWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      setItemList: [],
      currentCard: null,
      currentCardIndex: 0,
      setSize: 0
    };

    this.checkUserSubmit = this.checkUserSubmit.bind(this);
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
      this.setState(
        {
          setItemList: setItemList,
          currentCard: setItemList[0],
          setSize: setItemList.length,
          currentCardIndex: 0
        }
      );
    }

  }

  checkUserSubmit(answer) {
    if(answer === this.state.currentCard.props.term) {
      console.log('correct!');
    }

    else console.log('wrong!');


    this.setState(
      {
        currentCardIndex: this.state.currentCardIndex + 1,
        currentCard: this.state.setItemList[this.state.currentCardIndex + 1]
      });
  }

  render() {

    if(!this.props.activeSet)  {
      return (
        <div className='col-md-8'>
          <h1> Select a study set. </h1>
        </div>
      );
    }

    return (
      <div className='col-md-8'>
        <FlashCardsWindow currentCard = {this.state.currentCard}/>
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
