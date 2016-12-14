var data=[
	{id:1,title:'划分区块，拆分组件，静态页面',context:<p><img src="img/parse-img.png"/><img src="img/components-img.png"/></p>},
	{id:2,title:'确定最小ui state，添加反向数据流',context:'FilterableProductTable 添加初始state,并创建一个回调函数（通过onUserInput传递）。然后在搜索组件上通过input 的onChange 事件来接受它的通知，每次触发onchange后 执行函数跟新state状态'}
];


var Tipbox=React.createClass({
	render:function(){
		var context=[];
		this.props.data.forEach(function(list){
			context.push(<Details title={list.title} content={list.context} key={list.id}/>)
		}.bind(this));
		return (
			<div>
				<hr/>
				<h5>这是关于reactjs的列表显示以及条件筛选的demo <a href="http://reactjs.cn/react/docs/thinking-in-react-zh-CN.html">reactjs Demo 传送门</a></h5>
				{context}
			</div>
		)
	}
});
Tipbox.prototype.css={
	style1:{
		border:'1px solid #f2f2f2',
		borderRadius:'4px',
		fontSize:'14px'
	}
};

var Details=React.createClass({
	render:function(){
		return(
			<details>
				<summary>{this.props.title}</summary>
				{this.props.content}
			</details>
			)
	}
});
ReactDOM.render(
		<Tipbox data={data}/>,
		document.getElementById('tips')
);