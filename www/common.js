//静态数据
var data=[
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
//搜索条
var SearchBar=React.createClass({
	handleChange:function(){
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked
		)
	},
	render:function(){
		return (
			<form>
				<input type="text"
				       placeholder="Search.."
				       value={this.props.filterText}
				       ref="filterTextInput"
								onChange={this.handleChange}
				/>
				<p>
					<input
						type="checkbox"
						checked={this.props.inStockOnly}
					  ref="inStockOnlyInput"
					  onChange={this.handleChange}
					/>
					{' '}
					Only show products in stock
				</p>
			</form>
		)
	}
});

//数据表头
var ProductCategoryRow=React.createClass({
	render:function(){
		return (
			<tr><th colSpan="2">{this.props.product.category}</th></tr>
		)
	}
});

//数据详细信息
var ProductRow=React.createClass({
	render:function(){
		var name=this.props.product.stocked?
			this.props.product.name:
			<span style={{color:'red'}}>
						{this.props.product.name}
			</span>;
		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
});

//数据集合
var ProductTable=React.createClass({
	render:function(){
		var rows=[];
		var lastCategory=null;
		this.props.product.forEach(function(pro){
			if(pro.name.indexOf(this.props.filterText)===-1 || (!pro.stocked&&this.props.inStockOnly)){
				return ;
			}
			if(lastCategory!=pro.category){
				rows.push(<ProductCategoryRow product={pro} key={pro.category}/>);
			}
			rows.push(<ProductRow product={pro} key={pro.name}/>);
			lastCategory=pro.category;
		}.bind(this));
		return (
			<table>
				<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
				</thead>
				<tbody>
				{rows}
				</tbody>
			</table>
		)
	}
});

//表单框
var FilterableProductTable=React.createClass({
	getInitialState:function(){
		return{
			filterText: '',
			inStockOnly: false
		}
	},
	handleUserInput:function(filterText,inStockOnly){
		this.setState({
			filterText:filterText,
			inStockOnly:inStockOnly
		})
	},
	render:function(){
		return (
			<div>
				<SearchBar
					onUserInput={this.handleUserInput}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}/>
				<ProductTable
					product={this.props.product}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}/>
			</div>
		)
	}
});

ReactDOM.render(
	<FilterableProductTable product={data}/>,
	document.getElementById('content')
);