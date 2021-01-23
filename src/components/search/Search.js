import React, { Component } from 'react';
import TextField from 'material-ui/TextField'; 
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'; 
import axios from 'axios'; 
import ImageResults from '../image-results/ImageResults'

 class Search extends Component {
state = {
    searchText: '', 
    amount: 15, 
    apiUrl: 'https:pixabay.com/api',
    apiKey: '19432684-51edee1e135caabc3da5f5e96',
    images: []
}; 

onTextChange = e => {
    const val = e.target.value; 
    this.setState({ [e.target.name]: val }, () => {
        if(val === ''){
         this.setState({images: []})
        } else {

        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
        .then(res => this.setState({images: res.data.hits}))
        .catch(err => console.log(err)); 
    }});
}; 

onAmountChange = (e, index, value) => this.setState({amount: value})



    render() {
        console.log(this.state.images)
        return (
            <div>
                <TextField
                    name='searchText'
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search for Images"
                    fullWidth={true}
                    />
                    <br/>
                <SelectField
                    name="amount"
                    floatingLabelText="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    >
                    <MenuItem value={5} primaryText='Five' /> 
                    <MenuItem value={10} primaryText='Ten' />
                    <MenuItem value={15} primaryText="Fifteen" />
                    <MenuItem value={30} primaryText="Thirty" /> 
                    <MenuItem value={50} primaryText="Fifty" /> 
                </SelectField>
                <br/>
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />): null}
            </div>
        )
    }
}

export default Search;