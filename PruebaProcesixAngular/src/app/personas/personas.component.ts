import { Component, OnInit,ViewChild  } from '@angular/core';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { RestService } from '../_services/rest.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
	
	listPersonas = [''];
	displayedColumns: string[] = ['id',
								  'nombre_completo',
	                              'edad','profesion_id',
								  'barrio_id'];
								  
	dataSource = new MatTableDataSource<Personas>();

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//players: Player[];
    question: any;
    errorMessage: string;
    isLoading: boolean = true;

    constructor(private restservice:RestService) { }

    async ngOnInit() {
        //this.getPersonas();
		
		const personas: Personas[]=[];
		this.getPersonasList();
		
		//this.listPersonas=result;
          console.log(this.listPersonas);
          for (let key in this.listPersonas) {
                    
                              personas.push({ id: this.listPersonas[key]['id'],
                              nombre_completo:this.listPersonas[key]['nombre_completo'],
                              edad:this.listPersonas[key]['edad'],
                              profesion_id:this.listPersonas[key]['profesion_id'],
                              barrio_id:this.listPersonas[key]['barrio_id'],
							  
                              
    });


          }
		this.dataSource.paginator = this.paginator;
		
		//this.getPlayers();
        //this.getQuestion();
    }
	
	getPersonasList(){
		
	const personas: Personas[]=[];
    this.restservice.getPersonas().subscribe(
      result=>{
        if(result.code != 200){
          this.listPersonas=result;
          console.log(this.listPersonas);
          for (let key in this.listPersonas) {
							  personas.push({ 
							  id: this.listPersonas[key]['id'],
                              nombre_completo:this.listPersonas[key]['nombre_completo'],
                              edad:this.listPersonas[key]['edad'],
                              profesion_id:this.listPersonas[key]['profesion_id'],
                              barrio_id:this.listPersonas[key]['barrio_id'],
		});


          }
          this.dataSource = new MatTableDataSource(personas);
          
        }else{
         
        }
      }
    );
		
		
	}
	
    /*getPlayers() {
        this.playerService
            .getPlayers()
            .subscribe(
                players => {
                    this.players = players
                    this.isLoading = false
                },
                error => {
                    this.errorMessage = <any>error
                    this.isLoading = false
                }
            );
    }*/

    /*getQuestion() {
        this.triviaService
            .getQuestion()
            .subscribe(
                question => this.question = question,
                error => this.errorMessage = <any>error
            );
    }*/
	
	/*findPersona(id): Persona{
		return this.persona.find(player => player.id === id);
    }*
    /*findPlayer(id): Player {
        return this.players.find(player => player.id === id);
    }*/

    /*isUpdating(id): boolean {
        //return this.findPlayer(id).isUpdating;
		return this.findPersona(id).isUpdating;
    }*/

   /*appendPlayer(player: Player) {
        this.players.push(player);
    }

    deletePlayer(id) {
        let player = this.findPlayer(id)
        player.isUpdating = true
        this.playerService
            .deletePlayer(id)
            .subscribe(
                response => {
                    let index = this.players.findIndex(player => player.id === id)
                    this.players.splice(index, 1)
                    player.isUpdating = false
                },
                error => {
                    this.errorMessage = <any>error
                    player.isUpdating = false
                }
            );
    }*/

    /*rightAnswer(id) {
        let data = {
            correct: true
        }
        this.answer(id, data)
    }

    wrongAnswer(id) {
        let data = {
            correct: false
        }
        this.answer(id, data)
    }

    answer(id, data) {
        let player = this.findPlayer(id)
        player.isUpdating = true
        this.playerService
            .answer(id, data)
            .subscribe(
                response => {
                    player.answers = response.answers
                    player.points = response.points
                    player.isUpdating = false
                },
                error => {
                    this.errorMessage = <any>error
                    player.isUpdating = false
                }
            );
    }*/

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
}

export interface Personas {
  id: number;
  nombre_completo:string;
  edad:string;
  profesion_id:string;
  barrio_id:string;   
}