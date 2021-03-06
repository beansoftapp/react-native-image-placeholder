import React, { PropTypes } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

class ImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
	};

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd(){
    this.setState({
      isLoaded: true
    });
  }

  onError(){
    this.setState({
      isError: true
    });
  }

  render() {
    return(
      <Image
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={this.props.style}
        source={this.props.source}
        resizeMode={this.props.resizeMode}
      >
        {
          (this.state.isLoaded && !this.state.isError) ? this.props.children :
          <View style={styles.viewImageStyles}>
            <Image
              style={this.props.placeholderStyle ? this.props.placeholderStyle : [styles.imagePlaceholderStyles, this.props.customImagePlaceholderDefaultStyle]}
              source={this.props.placeholderSource ? this.props.placeholderSource : require('./Images/empty-image.png')}
            >
              <ActivityIndicator
                size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
                color={this.props.loadingStyle ? this.props.loadingStyle.color : 'gray'}
              />
            </Image>
          </View>
        }
        {
          this.props.children &&
          <View style={styles.viewChildrenStyles}>
          {
            this.props.children
          }
          </View>
        }
      </Image>
    );
  }
}

const styles = {
  viewImageStyles: {
    flex: 1,
    backgroundColor: '#e9eef1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
}

export default ImageLoad;
