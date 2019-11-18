(function(){
        $.fn.smhpage=function(option){
        var render = new loading(this,option);
        //console.log(option);
        render.Init();
    };
})()
function loading(element,obj){
    this.Init=function(){
        this.filling(obj.page);
        this.eventBind();
    };
    this.GetIndex=function(){
        return obj.page;
    }
    this.filling=function(index,t){
        var command=obj.command;
        var $dom = $(element);
        obj.page=parseInt(index);
        var start;
        var end;
        var html="";
        var prev="<span class=\"prev\" data-page=\""+(index-1)+"\">上一页</span>";
        var next="<span class=\"next\" data-page=\""+(index+1)+"\">下一页</span>";
        if(index==1){
            start=1;
            end=command;
            prev="";
        }
        if(index==obj.pagecount){
            next="";
            start=obj.pagecount-command;
            end=obj.pagecount;
        }
        if(index<obj.pagecount&&(index!=1&&index!=obj.pagecount)){
            var p = index+obj.command-1;
            start=index;
            var j = obj.pagecount-index+1;
            if(j>=command){
                end=index+command-1;
            }else{
                var o = command-j;
                start=start-o;
                end=obj.pagecount;
            }
        
            start=start-1;
 

        }
        for(; start <= end; start++){
            var active="";
            if(start==index){
                active="active";
            }
            html+="<span class=\""+active+"\" data-page=\""+start+"\">"+start+"</span>";
        }

        $dom.empty().html(prev+html+next);
        this.eventBind=function(){
            var that = this;
            var index = 1;
            $dom.off().on('click','span',function(){
                index=$(this).data('page');
                var t = $(this).attr("class");
                console.log(t);
                that.filling(index,t);
                obj.callback(that);
            })
        }
    }

}