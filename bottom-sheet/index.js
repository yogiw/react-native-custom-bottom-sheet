import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity } from 'react-native';
import { isEqual } from 'lodash';
import Colors from './Colors';

const animDuration = 300;

export default class BottomSheet extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    visible: PropTypes.bool,
    height: PropTypes.number,
    onVisibilityChange: PropTypes.func
  };

  state = {
    heightAnim: new Animated.Value(0),
    fadeAnim: new Animated.Value(0),
    visible: false
  };

  componentDidMount() {
    if (this.props.visible) {
      this.startAnimation();
    } else {
      this.hideAnimation();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.visible, this.props.visible)) {
      if (this.props.visible) {
        this.startAnimation();
      } else {
        this.hideAnimation();
      }
    }
  }

  startAnimation() {
    console.log(this.props.height);
    this.setState({ visible: true });
    Animated.timing(this.state.heightAnim, {
      toValue: this.props.height || 500,
      // easing: Easing.in(),
      duration: animDuration
    }).start();

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      // easing: Easing.in(),
      duration: animDuration
    }).start();
  }

  hideAnimation() {
    Animated.timing(this.state.heightAnim, {
      toValue: 0,
      // easing: Easing.back(),
      duration: animDuration
    }).start();

    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      // easing: Easing.in(),
      duration: animDuration
    }).start();

    setTimeout(() => {
      this.setState({ visible: false });
    }, animDuration + 10);
  }

  renderSheet = (heightAnim, fadeAnim) => (
    <React.Fragment>
      <Animated.View
        style={{
          zIndex: 9998,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: fadeAnim
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={e => this.props.onVisibilityChange(false)}
        />
      </Animated.View>
      <Animated.View
        shadowColor={'#000'}
        shadowOffset={{ width: 0, height: 10 }}
        shadowOpacity={0.4}
        shadowRadius={20}
        style={{
          zIndex: 9999,
          padding: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: heightAnim,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 1,
          backgroundColor: Colors.whiteColor,
          borderColor: Colors.borderColor
        }}
      >
        {this.props.children}
      </Animated.View>
    </React.Fragment>
  );

  render() {
    let { heightAnim, fadeAnim } = this.state;

    if (this.state.visible) {
      return this.renderSheet(heightAnim, fadeAnim);
    } else {
      return <React.Fragment />;
    }
  }
}
