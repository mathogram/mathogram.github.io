//lister for auth state change
auth.onAuthStateChanged(user =>{
    if(user){
        console.log("пользователь вошел:", user);
        // setupUI(true);
        db.collection('users').doc(user.uid).get().then(doc=>{
            doc = doc.data()
            const html =`
            <br>
                Почта: ${user.email}<br>
                Имя: ${doc.name}<br>
                Фамилия: ${doc.surname}<br>
                Телефон: ${doc.phone}<br>
                ${(doc.admin)?"<br>Админ 👑":""}
                ${(doc.type == 'teacher')?"<br>Учитель 👨🏻‍🏫":""}
                ${(doc.type == 'student')?"<br>Ученик 👨🏻‍🎓":""}
            `;
            // document.querySelector("#accountBox > div").innerHTML=html;
        })
    }
    else{
        console.log("пользователь не вошел");
        // setupUI(false);
    }
})
//setupUI
const setupUI = (t)=>{
	let root = document.documentElement;

	root.style.setProperty('--user-yes', (!t)?"none":"block");
	root.style.setProperty('--user-no', (t)?"none":"block");
}

//auth.signOut() - log out
const logOut = ()=>{
    auth.signOut();
}