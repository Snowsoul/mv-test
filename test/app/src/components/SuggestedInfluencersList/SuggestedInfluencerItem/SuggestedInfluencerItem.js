import React from 'react';
import InfluencerItem from '../../InfluencerItem/InfluencerItem';
import { AddButton } from '../../Buttons/Buttons'

import './SuggestedInfluencerItem.css';

const SuggestedInfluencerItem = props => {
    return (
        <div className="suggested_influencer_item_wrapper">
            <div className="influencer_profile">
                <InfluencerItem data={props.data} />
            </div>
            <div className="influencer_utils">
                <AddButton />
            </div>
        </div>
    );

}

export default SuggestedInfluencerItem;