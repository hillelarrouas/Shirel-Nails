$(document).ready(function () {
    $("#inputText").keyup(function () {
        const value = $(this).val()

        if (isNaN(value)) {
            $(".mes").html('הזן ספרות בלבד')
            $('.text').html('')
        }
        else {
            $(".mes").html('')
            if (value.length === 7 || value.length === 8) {
                fetch(
                    `https://data.gov.il/api/3/action/datastore_search?q=${value}&resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3`
                ).then(j => j.json())
                    .then(data => {
                        rendertable(data.result.records)
                        console.log(data)
                    })
            }
            else {
                $('.text').html('')
            }
        }
    })
})

function test(text){
return text == null ? '' : text
}

function rendertable(car) {
    console.log(car[0])
    if (car[0] == undefined){
        $('.text').html('')
        $(".mes").html('לא נמצא רכב')
    }
    else{
        $('.text').html(
            `<table>
                  <tr>
                      <td>${test(car[0].mispar_rechev)}</td>
                      <td class="key">מספר רכב</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].shnat_yitzur)}</td>
                      <td class="key">שנת יצור</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].tozeret_cd)}</td>
                      <td class="key">קוד תוצר</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].sug_degem)}</td>
                      <td class="key">סוג דגם</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].degem_manoa)}</td>
                      <td class="key">דגם מנוע</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].tozeret_nm)}</td>
                      <td class="key">שם תוצר</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].baalut)}</td>
                      <td class="key">סוג בעלות</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].degem_cd)}</td>
                      <td class="key">קוד דגם</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].degem_nm)}</td>
                      <td class="key">שם דגם</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].ramat_gimur)}</td>
                      <td class="key">רמת גימור</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].ramat_eivzur_betihuty)}</td>
                      <td class="key">רמת איבזור בטיחותי</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].kvutzat_zihum)}</td>
                      <td class="key">קבוצת זיהום</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].mivchan_acharon_dt.split('T')[0])}</td>
                      <td class="key">תאריך מבחן טסט</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].tokef_dt.split('T')[0])}</td>
                      <td class="key">תוקף רישיון רכב</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].misgeret)}</td>
                      <td class="key">מספר שילדה</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].tzeva_rechev)}</td>
                      <td class="key">צבע רכב</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].zmig_kidmi)}</td>
                      <td class="key">מידות צמיג קידמי</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].zmig_ahori)}</td>
                      <td class="key">מידות צמיג אחורי</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].sug_delek_nm)}</td>
                      <td class="key">סוג דלק</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].horaat_rishum)}</td>
                      <td class="key">מספר הוראת רשום</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].kinuy_mishari)}</td>
                      <td class="key">כינוי מסחרי</td>
                  </tr>
                  <tr>
                      <td>${test(car[0].tzeva_cd)}</td>
                      <td class="key">קוד צבע</td>
                  </tr>
              </table>`
        ) }
}