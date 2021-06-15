clc
clear all
close all

X=[0.5 0.7 0.2; 0.4 0.1 0.5];
W1=[0.2 0.15; 0.1 0.2];
j=[0.5; 0.8];
b=[0.2; 0.1];
W2=[0.3 0.7];
y=[0.6 0.3 0.4];
rate=0.5;
M=3;
XNorm0=[(X(1,:)-mean(X(1,:)))./std(X(1,:)); (X(2,:)-mean(X(2,:)))./std(X(2,:))]; % Normalize input
for i=1:3

    i
    z1=W1*XNorm0; % Calculate 1st layer output
    z1Norm0=[(z1(1,:)-mean(z1(1,:)))./std(z1(1,:)); (z1(2,:)-mean(z1(2,:)))./std(z1(2,:))];  % Normalize 1st layer output
    zBatch=[j(1)*z1Norm0(1,:)+b(1); j(2)*z1Norm0(2,:)+b(2)];  % Calculate batch layer output
    a=zBatch;
    a(a<0)=0;  % Calculate relu output

    yhat=W2*a  % Calculate last layer output
    sum((yhat-y).^2)  % Calculate loss

    %% backprop
    dJdYhat=-2*(y-yhat);
    dYdw2=a';
    dJdw2=dJdYhat*dYdw2;

    dYda=repmat(W2',[1 M]);
    dadzBatch=ones(size(zBatch));
    dadzBatch(zBatch<0)=0;
    dadzBatch=reshape(dadzBatch,size(zBatch));
    dJdzBatch=repmat(dJdYhat,[size(W2,1) 1]).*dYda.*dadzBatch;

    dzBatchdj=z1Norm0;
    dJdj=sum(dJdzBatch.*dzBatchdj,2);

    dJdb=sum(dJdzBatch.*1,2);

    dzBatchdzNorm=repmat(j,[1 M]);
    dzNormdz=repmat([1/std(z1(1,:)); 1/std(z1(2,:))],[1 M]);
    dJdz = dJdzBatch.*dzBatchdzNorm.*dzNormdz;

    dzdw1=XNorm0';
    dJdw1=dJdz*dzdw1;
    
    W2=W2-rate*dJdw2
    j=j-rate*dJdj
    b=b-rate*dJdb
    W1=W1-rate*dJdw1
end
