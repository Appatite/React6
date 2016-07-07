
var SliderHolder = React.createClass({
    
    render: function () {

        return (
                < div className = "sliderHolder" >
                < SizeSlider / >
                < ThreeColorSlider / >
                < /div>
                );
    }

});


var ThreeColorSlider = React.createClass({
    getInitialState: function () {
        return {value: '125'};
    },
    handleColorChange: function (e) {
        this.setState({value: e.target.value})
        console.log('react range: ' + e.target.value)
    },
    render: function () {

        return (
                < input
                id = 'colorRange'
        type = "range"
        min = '1'
        max = '255'
                value = {this.state.value}
        onChange = {this.handleColorChange}
        />
                );
    }
});

var SizeSlider = React.createClass({
    getInitialState: function () {
        return {value: '150'};
    },
    handleSizeChange: function (e) {
        this.setState({value: e.target.value})
        console.log('react range: ' + e.target.value)
    },
    render: function () {

        return (
                < input
                id = 'range'
        type = "range"
        min = '100'
        max = '200'
                value = {this.state.value}
        onChange = {this.handleSizeChange}
        />
                );
    }
});

ReactDOM.render(
        < SliderHolder  / > ,
        document.getElementById('content')
);
