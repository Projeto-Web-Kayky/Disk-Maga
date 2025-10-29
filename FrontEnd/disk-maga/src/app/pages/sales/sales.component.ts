import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild, } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AddSaleDialogComponent } from '../../components/sales/add-sale-dialog/add-sale-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { ISale, ISaleResponse } from '../../interfaces/isale';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { ExpandSaleDetails } from '../../components/sales/expand-sale-details/expand-sale-details.component';

interface SaleItem {
  more: ISale;
  dateTime: string;
  item: string;
  subtotal: number;
}
@Component({
  selector: 'app-sales',
  imports: [
    MatDivider,
    MatIcon,
    MatFormFieldModule,
    MatFabButton,
    MatCard,
    MatCardContent,
    MatList,
    MatListItem,
    MatIconButton,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SaleItem>;

  displayedColumns = ['more', 'dateTime', 'item', 'subtotal'];
  dataSource = new MatTableDataSource<SaleItem>();
  private readonly destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readonly dialog = inject(MatDialog);

  constructor(private readonly saleService: SaleService, private readonly cdr: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  private readonly DIALOG_CONFIG = {
    ADD_SALE: {
      width: '1300px',
      maxWidth: '90vw',
      height: '80vh',
      maxHeight: '90vh',
    },
    SALE_DETAILS: {
      width: '800px',
    },
  } as const;

  openAddSaleDialog() {
    const dialogRef = this.dialog.open(AddSaleDialogComponent, this.DIALOG_CONFIG.ADD_SALE);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result?.success) {
          console.log("Carregou");
        }
      });
  }
  private readonly DIALOG_DETAILS_CONFIG = {
    CONFIGS: {
      width: '90%',
      maxWidth: '40vw' //fui colocar umas estilizações extras, mas não serviu como eu queria, deixei só isso msm
    }
  } as const;
  openSaleDetails() {
    this.dialog.open(ExpandSaleDetails, this.DIALOG_DETAILS_CONFIG.CONFIGS);
  }
}

