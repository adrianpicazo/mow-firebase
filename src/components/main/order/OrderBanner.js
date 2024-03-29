import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import { IC_WHITE_SHOPPING_BASKET } from '../../../res/images/index';
import { colors } from '../../../res/Colors';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import { TR_BODY_ORDER_TOTAL } from '../../../i18n/constants';

class OrderBanner extends Component {

    constructor(props, context) {
        super(props, context);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        analyticsTracker.trackEvent('Order Banner', 'Pressed');

        Actions.push('orderInfo');
    }

    render() {
        const {
            bannerStyle,
            imageContainerStyle,
            bannerTextStyle,
            imageStyle
        } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <Card style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={bannerStyle}
                >
                    <CardSection>
                        <View style={imageContainerStyle}>
                            <Image
                                style={imageStyle}
                                source={IC_WHITE_SHOPPING_BASKET}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={bannerTextStyle}>{numProducts}</Text>
                    </CardSection>

                    <CardSection>
                        <Text style={bannerTextStyle}>
                            {I18nUtils.tr(TR_BODY_ORDER_TOTAL)}: € {totalPrice}</Text>
                    </CardSection>
                </TouchableOpacity>
            </Card>
        );
    }
}

const styles = {
    bannerTextStyle: {
        fontSize: 20,
        color: colors.WHITE,
        fontWeight: 'bold'
    },
    bannerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.BLUE.N500,
        width: '95%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        elevation: 8,
        shadowColor: colors.BLACK,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 1,
            height: 5,
        }
    },
    imageContainerStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
        padding: 3
    },
    imageStyle: {
        height: '100%',
        width: undefined
    }
};

const mapStateToProps = ({ userOrder }) => {
    const { numProducts, totalPrice } = userOrder;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderBanner);
