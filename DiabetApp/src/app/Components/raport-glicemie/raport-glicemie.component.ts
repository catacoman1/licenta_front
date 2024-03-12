import { AuthService } from './../../Service/authentication.service';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { glicemie } from 'src/app/Models/Menu/glicemie';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-raport-glicemie',
  templateUrl: './raport-glicemie.component.html',
  styleUrls: ['./raport-glicemie.component.css'],
  providers: [MessageService]
})
export class RaportGlicemieComponent {

  data: any;
  basicOptions: any;

  glicemieValue: number = 0;
  glicemieDate: string | null = null;

  glicemieData: glicemie[] = [];

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService) { }


  ngOnInit() {
    this.initializeChartOptions();
    this.loadGlicemieData();

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Glicemie salvată cu succes!'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Eroare la salvarea glicemiei'});
  }

  initializeChartOptions() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },
          beginAtZero: true
        }
      }
    };
  }

  loadGlicemieData() {
    const userEmail = this.authService.getUserEmail();
  
    if (userEmail) {
      this.userService.getUserByEmail(userEmail).subscribe({
        next: (user) => {
          this.userService.getGlicemieByUserId(user.id).subscribe({
            next: (glicemieData) => {

              glicemieData.sort((a, b) => {
                
                if (a.date === null && b.date === null) return 0;
                if (a.date === null) return 1; 
                if (b.date === null) return -1;
              
                return new Date(a.date).getTime() - new Date(b.date).getTime();
              });

              this.glicemieData = glicemieData;


              const labels = glicemieData.map(g => g.date ? new Date(g.date).toLocaleDateString() : 'Unknown Date');
              const dataValues = glicemieData.map(g => g.value);
  
              this.data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Glicemie',
                    data: dataValues,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.4
                  }
                ]
              };
            },
            error: (error) => console.error('Error fetching glicemie data', error)
          });
        },
        error: (error) => console.error('Error fetching user by email', error)
      });
    } else {
      console.error('User email not found in localStorage');
    }
  }
  

  saveGlicemie() {
    const userEmail = this.authService.getUserEmail();
  
    
    if (userEmail && this.glicemieValue && this.glicemieDate !== null) {
      this.userService.getUserByEmail(userEmail).subscribe({
        next: (user) => {
          const newGlicemie: glicemie = {
            
            value: this.glicemieValue,
            date: this.glicemieDate, 
            
          };
          this.userService.createGlicemie(user.id, newGlicemie).subscribe({
            next: (savedGlicemie) => {
              this.showSuccess();
              this.loadGlicemieData();
            },
            error: (error) => {
              this.showError();
            }
          });
        },
        error: (error) => console.error('Error fetching user by email', error)
      });
    } else {
      console.error('Missing glycemia value, date, or user email not found');
    }
  }

  
  
  
  


}
