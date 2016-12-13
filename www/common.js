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
	render:function(){
		return (
			<form>
				<input type="text" placeholder="Search.."/>
				<label><input type="checkbox"/>股票相关</label>
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
			if(lastCategory!=pro.category){
				rows.push(<ProductCategoryRow product={pro} key={pro.category}/>);
				lastCategory=pro.category;
			}
			rows.push(<ProductRow product={pro} key={pro.name}/>);
		})
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
	render:function(){
		return (
			<div>
				<SearchBar/>
				<ProductTable product={this.props.product}/>
			</div>
		)
	}
});

ReactDOM.render(
	<FilterableProductTable product={data}/>,
	document.getElementById('content')
)