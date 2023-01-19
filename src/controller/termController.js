class termController{

    constructor(){
        this.line = document.querySelector('.select');
        this.boxs = document.querySelectorAll('.select .input-letter');
        this.word = RandomWord.newWord();
        this.index = 0;
        this.initEvents();
    }


    initEvents(){
        document.addEventListener('keyup', this.keyup= e=>{
            
            let test = this.line.querySelector('.sel');

            switch(e.key){
                case 'Enter':
                    this.verify();
                    break;
                case 'Backspace':
                    
                    if (test){test.innerHTML = '';}
                    this.arrowLeft();

                    break;
                case 'ArrowRight':
                    this.arrowRigth();
                    break;
                
                case 'ArrowLeft':
                    this.arrowLeft();
                    break;
                default:
                    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    if (letters.indexOf(e.key.toLocaleUpperCase()) >= 0){
                        
                        if (test){test.innerHTML = e.key.toLocaleUpperCase();}
                        
                        if(this.index<4){
                            this.arrowRigth();
                        } else{
                            this.index = 5;
                            this.removeSelection();
                        }

                    }
                    
            }


        });

        this.boxs.forEach((el, index)=>{

            el.addEventListener('click', this.testa=e=>{
                
                this.removeSelection();
                this.index = index;
                el.classList.add('sel');
                
            });

        });
    }
    arrowLeft(){
        if (this.index > 0){
            this.index--;
            this.boxs[this.index].click();
        }
    }
    arrowRigth(){
        if(this.index<4){
            this.index++;
            this.boxs[this.index].click();
        } 
    }

    removeSelection(){

        this.line.querySelectorAll('.input-letter').forEach(el=>{
                
            if(el.classList.toggle('sel')){
                el.classList.remove('sel');
            }

        });

    }

    verify(){

        let a = [];
        this.boxs.forEach(e=>{
            if(!e.innerHTML == ""){a.push(e.innerHTML);}
        });
        if(a.length == 5){
            if(RandomWord.verifyWord(a.join(''))){

                a.forEach((letter, index)=>{

                    if (letter.toLowerCase() == this.word[index]){
                        this.boxs[index].classList.add('right');
                    } else if (this.word.indexOf(letter.toLowerCase()) > -1){
                        this.boxs[index].classList.add('has');
                    }
        
                });
        
                document.removeEventListener('keyup', this.keyup);
                this.boxs.forEach((el, index)=>{
        
                    el.removeEventListener('click', this.testa);
        
                });
                
                this.line.classList.add('past-select');
                this.line.classList.remove('select');
                
                if (a.join('').toLowerCase() == this.word){
                    alert('acertou '+ RandomWord.realWord(this.word));
                    
                    return true;
                } 
                
    
                this.line = document.querySelector('.next');
                this.line.classList.remove('next');
                this.line.classList.add('select');
                [...term.line.children][0].classList.add('sel');
                this.boxs = document.querySelectorAll('.select .input-letter');
                this.index = 0
                this.initEvents();    


            }
            
        }
        
        
    }
}