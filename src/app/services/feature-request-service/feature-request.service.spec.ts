import { TestBed, async } from '@angular/core/testing';

import { FeatureRequestService } from './feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { of, from, Observable, BehaviorSubject } from 'rxjs';


describe('FeatureRequestService', () => {
  const feat1 = new FeatureRequest(100,"Do most things really well",5,10);
  const feat2 = new FeatureRequest(200,"Do all things well",5,10);
  const feat3 = new FeatureRequest(300,"Do all things amazing",5,10);
  const feat4 = new FeatureRequest(400,"Never ever screw up...EVER",5,10);
  const requests = [feat1,feat2,feat3,feat4];


  const failEveryTimeObs = any => {
    return new BehaviorSubject<any>(null);
  }
  

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureRequestService = TestBed.get(FeatureRequestService);
    expect(service).toBeTruthy();
  });

  //kata test 1
  //replace 'failEveryTimeObs with correct rxjs operator
  it('should NOT USE THE SERVICE and use some rxjs operator to create an observable that emits a single value for each feature element in an array', async(() => {

    let i = 0;

    failEveryTimeObs(requests).subscribe(request=>{
      expect(request.id).toBe(requests[i].id);
      i++;
    });

    
  }));

  //kata test 2
  //replace 'failEveryTimeObs with correct rxjs operator
  it('should NOT USE THE SERVICE and use some rxjs operator to create an observable that emits an array of values matching the array', async(() => {    

    failEveryTimeObs(requests).subscribe(r=>{      
      expect(r).toBe(requests);      
    });

  }));


  //kata test 3
  it('should emit a value when a singular value is passed to the newRequest() method while already observing', () => {
    const service: FeatureRequestService = TestBed.get(FeatureRequestService);

    service.getSubscribableNewRequests().subscribe(newRequest=>expect(newRequest).toBe(feat1));

    service.newRequest(feat1);
  });


  //kata test 4
  it('should emit the last value of an array of requests passed via the newRequests() method', () => {
    const service: FeatureRequestService = TestBed.get(FeatureRequestService);

    service.newRequests(requests);

    service.getSubscribableWithLatestItem().subscribe(r=>expect(r).toBe(feat4));
  });


  //kata test 5
  it('should emit the last 3 values that were passed to it via newRequests(), as well as a new singular value passed via newRequest()', () => {
    const service: FeatureRequestService = TestBed.get(FeatureRequestService);

    service.newRequests(requests);

    let newFeat = new FeatureRequest(500,"Special Sauce",6,3);

    let i = 1;

    service.getSubscribableWithLastThree().subscribe(feat=>{
      if (i<4) {
        expect(feat).toBe(requests[i]);
      } else {
        expect(feat).toBe(newFeat);
      }      
      i++;
    });

    service.newRequest(newFeat);

  });
});
