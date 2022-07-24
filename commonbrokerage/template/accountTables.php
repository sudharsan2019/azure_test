<div class="tab-content" id="nav-tabContent">
   <div class="tab-pane fade" id="list-sum" role="tabpanel" aria-labelledby="list-sum-list">
      <div class="table-responsive">
         <table class="table accIndi_table">
            <thead class="table_head_bg">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Quote No</th>
                    <th scope="col">Account Name</th>
                    <th scope="col">Zc</th>
                    <th scope="col">CC</th>
                    <th scope="col">LOB</th>
                    <th scope="col">Indication</th>
                    <th scope="col">File</th>
                </tr>
            </thead>
            <tbody>
               <tr>
                    <th scope="row">1 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Otto</td>
                    <td>25323</td>
                    <td>3462</td>
                    <td> Gl </td>
                    <td>625</td>
                    <td>Ql1/ Mpas</td>
               </tr>
               <tr>
                    <th scope="row">2 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Otto</td>
                    <td>25323</td>
                    <td>3462</td>
                    <td> Gl </td>
                    <td>625</td>
                    <td>Ql1/ Mpas</td>
               </tr>
               <tr>
                    <th scope="row">3 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Otto</td>
                    <td>25323</td>
                    <td>3462</td>
                    <td> Gl </td>
                    <td>625</td>
                    <td>Ql1/ Mpas</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
   
<!--      Notes part    -->
<div class="tab-pane fade  active show" id="list-notes" role="tabpanel" aria-labelledby="list-notes-list">
    <button type="button" class="btn btn-primary btn-sm" data-toggle="collapse" href="#newNote_collapse" aria-expanded="false" aria-controls="newNote_collapse"> (+) New Note </button>
    <div class="animated fadeIn">
        <div class="collapse" id="newNote_collapse">
            <?php include('newNote.php'); ?>
        </div>
    </div>
    <div class="table-responsive mt-1">
        <table class="table accIndi_table">
            <thead class="table_head_bg">
                <tr>
                   <th scope="col">#</th>
                   <th scope="col">Date</th>
                   <th scope="col">Note</th>
                   <th scope="col">By</th>
                   <th scope="col">Type</th>
                   <th scope="col">Actions</th>
               </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Delete</a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Delete</a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!--      Docs part   -->
<div class="tab-pane fade" id="list-docs" role="tabpanel" aria-labelledby="list-docs-list">
    <button type="button" class="btn btn-primary btn-sm" data-toggle="collapse" href="#upload_collapse" aria-expanded="false" aria-controls="upload_collapse" data-opentype="document"> Upload Doc </button>
    <div class="collapse" id="upload_collapse">
        <?php include('uploadEmail.php'); ?>
    </div>
    <div class="table-responsive mt-1">
         <table class="table accIndi_table">
            <thead class="table_head_bg">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Uploaded On</th>
                    <th scope="col">Name</th>
                    <th scope="col">Uploaded By</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th> 1 </th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Reassign</a>
                        <a href="#">View</a>
                    </td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Reassign</a>
                        <a href="#"> View </a>
                    </td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Date</td>
                    <td>23436</td>
                    <td>Uwer</td>
                    <td>XXX</td>
                    <td> <a href="#"> Edit </a> 
                        <a href="#"> Reassign</a>
                        <a href="#"> View </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!--      Email part   -->
<div class="tab-pane fade" id="list-email" role="tabpanel" aria-labelledby="list-email-list">
    <div class="table-responsive">
        <table class="table accIndi_table">
            <thead class="table_head_bg">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th> 1 </th>
                    <td>Date</td>
                    <td>bro@gmail.com</td>
                    <td>
                        abc@
                        <gmail class="com"></gmail>
                    </td>
                    <td>XXX</td>
                    <td> <a href="#"> Reassign</a>
                        <a href="#">Delete</a>
                    </td>
                </tr>
                <tr>
                    <th> 2 </th>
                    <td>Date</td>
                    <td>bro@gmail.com</td>
                    <td>
                        abc@
                        <gmail class="com"></gmail>
                    </td>
                    <td>XXX</td>
                    <td> <a href="#"> Reassign</a>
                        <a href="#">Delete</a>
                    </td>
                </tr>
                <tr>
                    <th> 3 </th>
                    <td>Date</td>
                    <td>bro@gmail.com</td>
                    <td>
                        abc@
                        <gmail class="com"></gmail>
                    </td>
                    <td>XXX</td>
                    <td> <a href="#"> Reassign</a>
                        <a href="#">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    <!--      Majesco part      -->
    <div class="tab-pane fade" id="list-majes" role="tabpanel" aria-labelledby="list-majes-list">
        <div class="d-flex flex-column accIndi_table">
            <div class="p-2 border border-info"> <a href="https://ategrity-uat.cloudinsurer.com/security-sso/login?service=https://ategrity-uat.cloudinsurer.com/mic/pct"> 1. Link1 </a> </div>
            <div class="p-2 border border-info"> <a href="https://ategrity-uat.cloudinsurer.com/security-sso/login?service=https://ategrity-uat.cloudinsurer.com/mic/pct"> 2. Link2 </a> </div>
        </div>
    </div>
</div>