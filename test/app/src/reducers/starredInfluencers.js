import { 
    STARRED_INFLUENCERS_FETCHED, 
    STARRED_INFLUENCERS_FETCHING,
    SORT_BY_CHANGE
} from '../actions/actionTypes';

const defaultState = {
    loading: false,
    sortBy: { value: 'engagementDesc' },
    influencers: []
};

// Cache object for sorting when the data is being fetched
const influencers = {
    initial: [],
    engagementAsc: [],
    engagementDesc: [],
    followersAsc:[],
    followersDesc: []
};

const engagementDescCompare = (a, b) => {
    return parseFloat(b.statistics.engagement) - parseFloat(a.statistics.engagement);
}

const engagementAscCompare = (a, b) => {
    return parseFloat(a.statistics.engagement) - parseFloat(b.statistics.engagement);
}

const followersDescCompare = (a, b) => {
    return b.statistics.followers - a.statistics.followers;
}

const followersAscCompare = (a, b) => {
    return a.statistics.followers - b.statistics.followers;
}

const sortList = (list, compare) => [...list].sort(compare)

const starredInfluencers = (state = defaultState, action) => {
    switch (action.type) {
        case STARRED_INFLUENCERS_FETCHING:
            return {
                ...state,
                loading: true
            };

        case STARRED_INFLUENCERS_FETCHED:

            // Cache the lists and prepare it for the sort by filter
            influencers.initial = [...action.starredInfluencers];
            influencers.engagementDesc = sortList(action.starredInfluencers, engagementDescCompare);
            influencers.engagementAsc = sortList(action.starredInfluencers, engagementAscCompare);            
            influencers.followersDesc = sortList(action.starredInfluencers, followersDescCompare);
            influencers.followersAsc = sortList(action.starredInfluencers, followersAscCompare);    

            return {
                ...state,
                loading: false,
                influencers: influencers[state.sortBy.value]
            };
        
        case SORT_BY_CHANGE:
            // If the user removes the sort filter, 
            // then we should show the data sorted as is from the API
            if (!action.option)
                return {
                    ...state,
                    sortBy: { value: null },
                    influencers: influencers.initial
                }

            return {
                ...state,
                sortBy: { value: action.option.value },
                influencers: influencers[action.option.value]
            }
        default:
            return state;
    }
}

export default starredInfluencers;