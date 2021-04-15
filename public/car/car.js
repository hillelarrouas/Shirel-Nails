let araydata1;
let araydata2;

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
                        araydata1 = data.result.records[0]
                        if (araydata1 == undefined) {
                            $('.text').html('')
                            $(".mes").html('לא נמצא רכב')
                        }
                        else {
                            fetchdata2(`${test(data.result.records[0].tozeret_nm)} ${test(data.result.records[0].kinuy_mishari)} ${test(data.result.records[0].ramat_gimur)} ${test(data.result.records[0].shnat_yitzur)} ${test(data.result.records[0].degem_nm)} ${test(data.result.records[0].degem_cd)}`)
                        }
                    })
            }
            else {
                $('.text').html('')
            }
        }
    })
})


function fetchdata2(totaldata) {
    fetch(`https://data.gov.il/api/3/action/datastore_search?q=${totaldata}&resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40`)
        .then(j => j.json())
        .then(data => {
            araydata2 = data.result.records[0]
            rendertable()
        })
}

function rendertable() {
    console.log(araydata1)
    console.log(araydata2)

    if (araydata1 == undefined || araydata2 == undefined) {
        $('.text').html('')
        $(".mes").html('לא נמצא רכב')
    }
    else {
        $('.text').html(
            `<table>
                  <tr>
                      <td>${test(araydata1.mispar_rechev)}</td>
                      <td class="key">מספר רכב</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.shnat_yitzur)}</td>
                      <td class="key">שנת יצור</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.tozeret_nm)}</td>
                      <td class="key">שם תוצר</td>
                  </tr>
                  <tr>
                      <td>${test(araydata2.koah_sus)}</td>
                      <td class="key">כח סוס</td>
                  </tr>
                  <tr>
                      <td>${test(araydata2.nefah_manoa)}</td>
                      <td class="key">נפח מנוע</td>
                  </tr>
                  <tr>
                  <td>${test(araydata1.ramat_gimur)}</td>
                  <td class="key">רמת גימור</td>
                 </tr>
                  <tr>
                    <td>${test(araydata2.mishkal_kolel)}</td>
                    <td class="key">משקל כולל</td>
                  </tr>
                  <tr>
                    <td>${test(araydata2.mispar_kariot_avir)}</td>
                    <td class="key">מספר כריות אוויר</td>
                 </tr>
                  <tr>
                    <td>${test(araydata2.halon_bagg_ind)}</td>
                    <td class="key">חלון בגג</td>
                 </tr>
                  <tr>
                      <td>${test(araydata1.tozeret_cd)}</td>
                      <td class="key">קוד תוצר</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.sug_degem)}</td>
                      <td class="key">סוג דגם</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.degem_manoa)}</td>
                      <td class="key">דגם מנוע</td>
                  </tr>

                  <tr>
                      <td>${test(araydata1.baalut)}</td>
                      <td class="key">סוג בעלות</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.degem_cd)}</td>
                      <td class="key">קוד דגם</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.degem_nm)}</td>
                      <td class="key">שם דגם</td>
                  </tr>

                  <tr>
                      <td>${test(araydata1.ramat_eivzur_betihuty)}</td>
                      <td class="key">רמת איבזור בטיחותי</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.kvutzat_zihum)}</td>
                      <td class="key">קבוצת זיהום</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.mivchan_acharon_dt.split('T')[0])}</td>
                      <td class="key">תאריך מבחן טסט</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.tokef_dt.split('T')[0])}</td>
                      <td class="key">תוקף רישיון רכב</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.misgeret)}</td>
                      <td class="key">מספר שילדה</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.tzeva_rechev)}</td>
                      <td class="key">צבע רכב</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.zmig_kidmi)}</td>
                      <td class="key">מידות צמיג קידמי</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.zmig_ahori)}</td>
                      <td class="key">מידות צמיג אחורי</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.sug_delek_nm)}</td>
                      <td class="key">סוג דלק</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.horaat_rishum)}</td>
                      <td class="key">מספר הוראת רשום</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.kinuy_mishari)}</td>
                      <td class="key">כינוי מסחרי</td>
                  </tr>
                  <tr>
                      <td>${test(araydata1.tzeva_cd)}</td>
                      <td class="key">קוד צבע</td>
                  </tr>
              </table>`
        )
    }
}



function test(text) {
    return text == null ? '' : text
}