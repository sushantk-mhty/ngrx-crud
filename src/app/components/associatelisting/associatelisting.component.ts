import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/model/associate.model';
import * as AssociateActions from 'src/app/store/associate/associate.actions';
import * as AssociateSelector from 'src/app/store/associate/associate.selector';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.scss']
})
export class AssociatelistingComponent implements OnInit{

  dialog=inject(MatDialog);
  store=inject(Store);
  associateList !:Associates[];
  datasource: any;
  displayedColums: string[] = ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.store.dispatch(AssociateActions.loadAssociate());
    this.store.select(AssociateSelector.getAssociateList).subscribe(item=>{
      this.associateList=item;
      this.datasource=new MatTableDataSource<Associates>(this.associateList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
    
  }
  onAddAssociate(){
    this.OpenPopup(0,'Create Associate');
  }
  OpenPopup(code:number, title:string){
    this.store.dispatch(AssociateActions.openPopup());
    this.dialog.open(AddassociateComponent,{
      width:'50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code : code,
        title:title
      }
    })
  }
  onFunctionEdit(code:number){
      this.OpenPopup(code, 'Update Associate');
      this.store.dispatch(AssociateActions.getAssociate({id:code}));

  }
  onFunctionDelete(code:number){
    if(confirm('do you want to remove?')){
      this.store.dispatch(AssociateActions.deleteAssociate({code:code}));
    }
  }
}
