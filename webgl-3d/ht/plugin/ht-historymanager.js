!function(B,A,F){"use strict";var p="ht",Y=B[p],Z=Y.Default,z=Z.def,o=Z.getInternal();Y.HistoryManager=function(l){this._histories=[],this.setDataModel(l)},z(Y.HistoryManager,A,{ms_ac:["dataModel","histories","historyIndex","maxHistoryCount","disabled"],ms_fire:1,_historyIndex:-1,_betweenTransaction:0,_maxHistoryCount:200,_disabled:!1,ignoredPropertyMap:{imageLoaded:!0,children:!0,attaches:!0,shape:!0,childChange:!0,agentChange:!0,sourceAgent:!0,targetAgent:!0,edgeGroup:!0,"*":!0},ignoreDataModelPropertyMap:{},beginInteraction:function(){this.beginTransaction()},endInteraction:function(){this.endTransaction()},beginTransaction:function(){if(!this._disabled){var T=this;T._betweenTransaction++,1===T._betweenTransaction&&(T._transactionHistories={})}},endTransaction:function(){if(!this._disabled){var s=this,y=s._histories;if(s._betweenTransaction>0&&s._betweenTransaction--,0===s._betweenTransaction){if(s._transactionHistories){var l=[];for(var v in s._transactionHistories)l.push(s._transactionHistories[v]);l.length&&(y=y.slice(0,s._historyIndex+1),y.push(l),y.length>s._maxHistoryCount&&(y=y.slice(y.length-s._maxHistoryCount)),s.setHistories(y),s.setHistoryIndex(y.length-1,!0))}delete s._transactionHistories}}},setDataModel:function(H){var _=this,h=_._dataModel;h!==H&&(h&&(delete h._historyManager,h.ump(_.handleDataModelPropertyChange,_),h.umm(_.$5p,_),h.umd(_.$6p,_),h.removeHierarchyChangeListener(_.handleHierarchyChange,_),h.removeIndexChangeListener(_.handleIndexChange,_)),_._dataModel=H,H&&(H._historyManager=_,H.mp(_.handleDataModelPropertyChange,_),H.mm(_.$5p,_),H.md(_.$6p,_),H.addHierarchyChangeListener(_.handleHierarchyChange,_),H.addIndexChangeListener(_.handleIndexChange,_)),_.fp("dataModel",h,H),_.clear())},setHistoryIndex:function(y,N){var I=this,i=I._historyIndex,t=I._histories.length;if(-1>y?y=-1:y>=t&&(y=t-1),i!==y){if(!N){var Z=y-i;Z>0?I.$2p(Z):0>Z&&I.$1p(-Z)}I._historyIndex=y,I.fp("historyIndex",i,y),I.dataModel&&I.dataModel.onHistoryManagerChanged()}},setMaxHistoryCount:function(B){var E=this,b=E._histories,z=E._maxHistoryCount;(!B||0>=B)&&(B=10),z!==B&&(E._maxHistoryCount=B,E.fp("maxHistoryCount",z,B),b.length>B&&E.clear())},cloneValue:function(J){return Y.Default.clone(J)},isPropertyUndoable:function(y){return y&&!this.ignoredPropertyMap[y]},isIndexUndoable:function(){return!1},isDataModelPropertyUndoable:function(L){return L&&!this.ignoreDataModelPropertyMap[L]},$5p:function(P){this.handleChange(P,P.kind)},$6p:function(h){this.handleChange(h,"property")},handleHierarchyChange:function(C){this.handleChange(C,"hierarchy")},handleIndexChange:function(f){this.handleChange(f,"index")},handleDataModelPropertyChange:function(A){this.handleChange(A,"dataModelProperty")},toChildrenInfo:function(f){var y={};return y.data=f,y.children=[],f.eachChild(function(h){y.children.push(this.toChildrenInfo(h))},this),y},restoreChildren:function(M){var p=M.data;M.children.forEach(function($){var m=$.data;m.getParent()!==p&&p.addChild(m),this._dataModel.contains(m)||this._dataModel.add(m),this.restoreChildren($)},this)},handleChange:function(q,w){var C=this;if(!(C._disabled||C._isUndoRedoing||Z.loadingRefGraph)){var x,V=(C._histories,q.data),o=q.property;if(!V||!(V._refGraph||V instanceof Y.RefGraph)){if("property"===w)C.isPropertyUndoable(o,V)&&(x={kind:w,data:V,property:o,oldValue:C.cloneValue(q.oldValue,V,o),newValue:C.cloneValue(q.newValue,V,o),event:q});else if("hierarchy"===w||"index"===w&&C.isIndexUndoable(q))x={kind:w,data:V,oldIndex:q.oldIndex,newIndex:q.newIndex,event:q};else if("clear"===w)x={kind:w,json:q.json,event:q};else if("add"===w){if(x={kind:w,data:V,event:q,childrenInfo:this.toChildrenInfo(V),parent:V.getParent()},x.parent){var c=C._dataModel.getSiblings(V);x.siblingsIndex=c.indexOf(V)}V instanceof Y.Node&&(x.host=V.getHost(),x.attaches=V.getAttaches()?V.getAttaches().toArray():F),V instanceof Y.Edge&&(x.source=V.getSource(),x.target=V.getTarget())}else"remove"===w?x={kind:w,data:V,event:q}:"dataModelProperty"===w&&C.isDataModelPropertyUndoable(o,V)&&(x={kind:w,property:o,oldValue:C.cloneValue(q.oldValue,V,o),newValue:C.cloneValue(q.newValue,V,o),event:q});C.addHistory(x)}}},addHistory:function(Q){var B=this;if(Q)if(B._betweenTransaction){var n=(Q.data?Q.data._id:0)+"_"+Q.kind+"_"+Q.property;if("property"===Q.kind||"dataModelProperty"===Q.kind){var g=B._transactionHistories[n];g&&(Q.oldValue=g.oldValue)}B._transactionHistories[n]=Q}else{var E=B._histories;E=E.slice(0,B._historyIndex+1),E.push([Q]),E.length>B._maxHistoryCount&&(E=E.slice(E.length-B._maxHistoryCount)),B.setHistories(E),B.setHistoryIndex(E.length-1,!0)}},canUndo:function(){return!this._disabled&&this._historyIndex>=0&&this._historyIndex<this._histories.length},canRedo:function(){return!this._disabled&&this._historyIndex>=-1&&this._historyIndex<this._histories.length-1},undo:function(L){(!L||0>=L)&&(L=1),this.setHistoryIndex(this._historyIndex-L)},$1p:function(k){if(this.canUndo()){var T,M=this,g=M._dataModel,f=M._histories,i=M._historyIndex,L=0;for(M._isUndoRedoing=!0,Z.setIsolating(!0);k>0;){if(i>=0&&i<f.length){L++,T=f[i],i--;for(var Y=T.length-1;Y>=0;Y--){var t=T[Y],v=t.kind,X=t.data,y=t.property,z=t.event,e=this.cloneValue(t.oldValue,X,y);if(t.undo)t.undo();else if("add"===v)g.remove(X,{keepChildren:!0});else if("remove"===v)g.contains(X)||g.add(X,z.rootsIndex,z.datasIndex);else if("clear"===v)g.deserialize(Z.clone(t.json));else if("property"===v)if("parent"===y)e?e.addChild(X,z.oldIndex):(X.setParent(e),z.oldIndex>=0&&g.moveTo(X,z.oldIndex));else{var W=null;0===y.indexOf("a:")?(W="attr",y=y.replace("a:","")):0===y.indexOf("s:")?(W="style",y=y.replace("s:","")):0===y.indexOf("f:")&&(W="field",y=y.replace("f:","")),o.setPropertyValue(X,W,y,e)}else if("dataModelProperty"===v){var W=null;0===y.indexOf("a:")?(W="attr",y=y.replace("a:","")):0===y.indexOf("s:")?(W="style",y=y.replace("s:","")):0===y.indexOf("f:")&&(W="field",y=y.replace("f:","")),o.setPropertyValue(g,W,y,e)}else"hierarchy"===v?g.moveTo(X,t.oldIndex):"index"===v&&g.moveToIndex(X,t.oldIndex)}}k--}Z.setIsolating(!1),delete M._isUndoRedoing,M.afterUndo(L)}},afterUndo:function(){},redo:function(J){(!J||0>=J)&&(J=1),this.setHistoryIndex(this._historyIndex+J)},$2p:function(W){if(this.canRedo()){var I,b=this,V=b._dataModel,E=b._histories,n=b._historyIndex,A=0;for(b._isUndoRedoing=!0,Z.setIsolating(!0);W>0;){if(n>=-1&&n<E.length-1){A++,n++,I=E[n];for(var l=0;l<I.length;l++){var w=I[l],x=w.kind,m=w.data,k=w.property,d=w.event,$=this.cloneValue(w.newValue,m,k);if(w.redo)w.redo();else if("add"===x)w.parent&&!m.getParent()&&w.parent.addChild(m,w.siblingsIndex),V.contains(m)||V.add(m,d.rootsIndex,d.datasIndex),this.restoreChildren(w.childrenInfo),m instanceof Y.Node&&(m.setHost(w.host),w.attaches&&w.attaches.forEach(function(j){j.setHost(m)})),m instanceof Y.Edge&&(m.setSource(w.source),m.setTarget(w.target));else if("remove"===x)V.remove(m);else if("clear"===x)V.clear();else if("property"===x)if("parent"===k)$?$.addChild(m,d.newIndex):(m.setParent($),d.newIndex>=0&&V.moveTo(m,d.newIndex));else{var e=null;0===k.indexOf("a:")?(e="attr",k=k.replace("a:","")):0===k.indexOf("s:")?(e="style",k=k.replace("s:","")):0===k.indexOf("f:")&&(e="field",k=k.replace("f:","")),o.setPropertyValue(m,e,k,$)}else if("dataModelProperty"===x){var e=null;0===k.indexOf("a:")?(e="attr",k=k.replace("a:","")):0===k.indexOf("s:")?(e="style",k=k.replace("s:","")):0===k.indexOf("f:")&&(e="field",k=k.replace("f:","")),o.setPropertyValue(V,e,k,$)}else"hierarchy"===x?V.moveTo(m,w.newIndex):"index"===x&&V.moveToIndex(m,w.newIndex)}}W--}Z.setIsolating(!1),delete b._isUndoRedoing,this.afterRedo(A)}},afterRedo:function(){},clear:function(){this.setHistories([]),this.setHistoryIndex(-1,!0),this._betweenTransaction=0,delete this._transactionHistories}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);