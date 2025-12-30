/* eslint-disable */
/**
 * This file has been borrowed from `react-native-settings-list` package (under the MIT license)
 * to get around compatibility issues introduced by latest version of react native.
 * 
 * The original code can be accessed at https://github.com/evetstech/react-native-settings-list
 * 
 * Original software license:

The MIT License (MIT)

Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

export type SettingsListProps = {
  backgroundColor: string;
  borderColor: string;
  defaultItemSize: number;
  underlayColor: string;
  defaultTitleStyle?: object;
  defaultTitleInfoPosition?: string;
  scrollViewProps?: object;
  children: React.CElement<{}, SettingsListHeader | SettingsListItem>[];
};

export class SettingsList extends React.Component<SettingsListProps> {
  static defaultProps ={
    backgroundColor: 'white',
    borderColor: 'black',
    defaultItemSize: 50,
    underlayColor: 'transparent',
    defaultTitleStyle: {fontSize: 16}
  };

  _getGroups(){
    var groupNumber = -1;
    let headers = [];
    let itemGroup = [];
    let result = [];
    React.Children.forEach(this.props.children, (child) => {
      // Allow for null, optional fields
      if(!child) return;

      if(child.type.displayName === 'SettingsListHeader'){
        if(groupNumber != -1){
          result[groupNumber] = {items: itemGroup, header: headers[groupNumber] };
          itemGroup = [];
        }
        groupNumber++;
        headers[groupNumber] = child.props;
      } else if(child.type.displayName === 'SettingsListItem'){
        if(groupNumber == -1){
          groupNumber++;
        }
        itemGroup.push(child.props);
      } else {
        if(groupNumber == -1){
          groupNumber++;
        }
        itemGroup.push(child);
      }
    });
    result[groupNumber] = {items: itemGroup, header: headers[groupNumber] };
    return result;
  }

  render(){
    return (
      <ScrollView {...this.props.scrollViewProps}>
        {this._getGroups().map((group, index) => {
          return this._groupView(group, index);
        })}
      </ScrollView>
    )
  }

  _groupView(group, index){
    if(group.header){
      return (
        <View key={'group_' + index}>
          <Text style={[{margin:5},group.header.headerStyle]} numberOfLines={group.header.headerNumberOfLines} ellipsizeMode="tail" ref={group.header.headerRef}>{group.header.headerText}</Text>
          <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
            {group.items.map((item, index) => {
              return this._itemView(item,index, group.items.length);
            })}
          </View>
        </View>
      )
    } else {
      let items;
      if (group.items.length > 0) {
        items = (
          <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
            {group.items.map((item, index) => {
              return this._itemView(item,index, group.items.length);
            })}
          </View>
        );
      }

      return (
        <View key={'group_' + index}>
          {items}
        </View>
      )
    }
  }

  _itemEditableBlock(item, index: number, position?: 'Bottom') {

    return ([
        <Text
            key={'itemTitle_' + index}
            style={[
              item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
              position === 'Bottom' ? null : styles.titleText
            ]}>
            {item.title}
        </Text>,
        item.isEditable ?
        <TextInput
              key={item.id}
              style={item.editableTextStyle ? item.editableTextStyle : styles.editableText}
              placeholder = {item.placeholder}
              onChangeText={(text) => item.onTextChange(text)}
              value={item.value} />
        : null
    ])
  }

  _itemTitleBlock(item, index, position?: 'Bottom') {
    return ([
      <Text
          key={'itemTitle_' + index}
          style={[
            item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
            position === 'Bottom' ? null : styles.titleText
          ]}>
          {item.title}
      </Text>,
      item.titleInfo ?
        <Text
            key={'itemTitleInfo_' + index}
            style={[
              item.rightSideStyle ? item.rightSideStyle
              :
                position === 'Bottom' ? null : styles.rightSide,
                {color: '#B1B1B1'},
              item.titleInfoStyle
            ]}>
            {item.titleInfo}
        </Text>
        : null
    ])
  }

  _itemView(item, index, max){
    var border;

    if (item.type && item.type.displayName) {
        return item;
    }

    if(item.borderHide) {
      switch(item.borderHide) {
        case 'Top' : border = {borderBottomWidth:1, borderColor: this.props.borderColor}; break;
        case 'Bottom' : border = {borderTopWidth:1, borderColor: this.props.borderColor}; break;
      }
    } else {
      border = index === max-1 ? {borderWidth:0} : {borderBottomWidth:1, borderColor: this.props.borderColor};
    }

    let titleInfoPosition = item.titleInfoPosition ? item.titleInfoPosition : this.props.defaultTitleInfoPosition;

    return (
      <TouchableHighlight accessible={false} key={'item_' + index} underlayColor={item.underlayColor ? item.underlayColor : this.props.underlayColor} onPress={item.onPress} onLongPress={item.onLongPress} ref={item.itemRef}>
        <View style={item.itemBoxStyle ? item.itemBoxStyle : [styles.itemBox, {backgroundColor: item.backgroundColor ? item.backgroundColor : this.props.backgroundColor}]}>
          {item.icon}
          {item.isAuth ?
            <View style={item.titleBoxStyle ? item.titleBoxStyle : [styles.titleBox, border]}>
              <View style={{paddingLeft:5,flexDirection:'column',flex:1}}>
                <View style={{borderBottomWidth:1,borderColor:this.props.borderColor}}>
                  <TextInput
                    ref="UserNameInputBlock"
                    // @ts-expect-error - The refs types are not correctly defined.
                    onSubmitEditing={() => this.refs.PasswordInputBlock.focus()}
                    style={{flex:1,height:30, borderBottomWidth:1}}
                    placeholder = "username"
                    {...item.authPropsUser}
                  />
                </View>
                <View>
                  <TextInput
                    ref="PasswordInputBlock"
                    style={{flex:1,height:30}}
                    placeholder = "password"
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    {...item.authPropsPW}
                    onSubmitEditing={() => item.onPress()}
                  />
                </View>
              </View>
            </View>
          :
          <View style={item.titleBoxStyle ? item.titleBoxStyle : [styles.titleBox, border, {minHeight:item.itemWidth ? item.itemWidth : this.props.defaultItemSize}]}>
            {titleInfoPosition === 'Bottom' ?
                <View style={{flexDirection:'column',flex:1,justifyContent:'center'}}>
                    {item.isEditable ? this._itemEditableBlock(item, index, 'Bottom') : this._itemTitleBlock(item, index, 'Bottom')}
                </View>
              : item.isEditable ? this._itemEditableBlock(item, index) : this._itemTitleBlock(item, index)}

            {item.rightSideContent ? item.rightSideContent : null}
            {item.hasSwitch ?
              <Switch
                {...item.switchProps}
                style={styles.rightSide}
                onValueChange={(value) => item.switchOnValueChange(value)}
                value={item.switchState}/>
                : null}
            {this.itemArrowIcon(item)}
          </View>
        }
        </View>
      </TouchableHighlight>
    )
  }

  itemArrowIcon(item) {
    if(item.arrowIcon) {
        return item.arrowIcon;
    }

    return null;
  }
}

const styles = StyleSheet.create({
  itemBox: {
    flex:1,
    justifyContent:'center',
    flexDirection:'row'
  },
  titleBox: {
    flex:1,
    paddingLeft:15,
    flexDirection:'row'
  },
  titleText: {
    flex:1,
    alignSelf:'center'
  },
  rightSide: {
    marginRight:15,
    alignSelf:'center'
  },
  editableText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15
  }
});

/**
 * Optional Header for groups
 */
export class SettingsListHeader extends React.Component {
  static displayName = 'SettingsListHeader';

  static propTypes = {
    headerText: PropTypes.string,
    headerStyle: PropTypes.object,
    headerRef: PropTypes.func,
    headerNumberOfLines: PropTypes.number,
  };

  getDefaultProps() {
    return {
      headerNumberOfLines: 1,
    };
  };

  /**
   * not directly rendered
   */
  render(){
    return null;
  }
}

export type SettingsListItemProps = {
  /**
   * Title being displayed
   */
  title?: string,
  titleStyle?: {[k: string]: any},
  /**
   * Icon displayed on the left of the settings item
   */
  icon?: React.ReactNode,

  /**
   * Item Box Style
   */
  itemBoxStyle?: {[k: string]: any},
  /**
   * Title Box Style
   */
  titleBoxStyle?: {[k: string]: any},
  /**
   * Right Side Style
   */
  rightSideStyle?: {[k: string]: any},
  /**
   * Editable Right Side Style
   */
  editableTextStyle?: {[k: string]: any},

  /**
   * Individual item width.  Can be globally set in the parent.  Will become deprecated
   */
  itemWidth?: number,
  /**
   * Allows for the item to become an auth item
   */
  isAuth?: boolean,
  authPropsUser?: {[k: string]: any},
  authPropsPW?: {[k: string]: any},
  /**
   * Individual background color. Can be globally set in the parent. Will become Deprecated
   */
  backgroundColor?: string,

  /**
   * Individual underlay click color.  Can be globally set in the parent.
   */
  underlayColor?: string,
  /**
   * Item on press callback.
   */
  onPress?: (...args: any[]) => any,
  /**
   * Item on long press callback.
   */
  onLongPress?: (...args: any[]) => any,
  /**
   * Enable or disable the > arrow at the end of the setting item.
   */
  hasNavArrow?: boolean,
  arrowIcon?: React.ReactNode,

  arrowStyle?: {[k: string]: any},
  /**
   * Enable or disable a Switch component
   */
  hasSwitch?: boolean,
  /**
   * Switch state
   */
  switchState?: boolean,
  /**
   * Switch props
   */
  switchProps?: {[k: string]: any},
  /**
   * On value change callback
   */
  switchOnValueChange?: (...args: any[]) => any,
  /**
   * Right side information on the setting item
   */
  titleInfo?: string,
  titleInfoStyle?: {[k: string]: any},
  /**
   * If 'Bottom', info is placed beneath the title
   */
  titleInfoPosition?: string,
  /**
   * Right side content
   */
  rightSideContent?: React.ReactNode,
  /* Gives opens to hide specific borders */
  borderHide?: 'Top' | 'Bottom' | 'Both',

  itemRef?: (...args: any[]) => any,
};

/**
 * Individual Items in the Settings List
 */
export class SettingsListItem extends React.Component<SettingsListItemProps> {
  static displayName = 'SettingsListItem';

  getDefaultProps(){
    return {
      hasNavArrow: true
    }
  }
  /**
   * not directly rendered
   */
  render(){
    return null;
  }
}

export default SettingsList;
